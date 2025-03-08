const TryCatch = require("../../utils/TryCatch");
const { Chat, User, Message, Sequelize } = require("../../models");
const AppError = require("../../utils/appError");
const { emitEvent } = require("../../utils/feature");
const { ALERT, REFETCH_CHATS, NEW_ATTACHEMENT, NEW_MESSAGE_ALERT } = require("../../constants/events");
const getOtherMember = require("../../lib/helper");
const { Op } = require("sequelize");

const newGroup = TryCatch(async (req, res, next) => {
    const { name, members } = req.body;
    const { id } = req.user;

    if (members.length < 2) {
        return next(new AppError("Group chat must have at least 3 members", 400));
    }
    // console.log("req user", req.user);

    const allMembers = [...members, id];

    await Chat.create({
        name,
        groupChat: true,
        creator: id,
        member: allMembers
    });

    emitEvent(req, ALERT, allMembers, `Welcome to ${name} group.`);
    emitEvent(req, REFETCH_CHATS, members);

    res.status(201).json({
        success: true,
        message: "Group created",
    })
});

const getMyChats = TryCatch(async (req, res, next) => {
    const { id } = req.user;

    const chats = await Chat.findAll({
        where: {
            member: {
                [Op.contains]: [id.toString()],
            },
        },
    },
    );

    const uniqueMemberIds = [...new Set(chats.flatMap(chat => chat.member))];


    const users = await User.findAll({
        where: {
            id: {
                [Op.in]: uniqueMemberIds.map(id => parseInt(id)), // Convert back to integers
            },
        },
        attributes: ["id", "name", "avatar"],
    });

    const chatsWithUsers = chats.map(chat => {
        const chatData = chat.toJSON();
        chatData.member = chatData.member.map(memberId => {
            const user = users.find(u => u.id === parseInt(memberId));
            return user ? { id: user.id, name: user.name, avatar: user.avatar } : null;
        }).filter(Boolean);
        return chatData;
    });

    const transformedChats = chatsWithUsers.map(({ id, name, member, groupChat }) => {
        const otherMember = getOtherMember(member, req.user.id);

        return {
            id,
            groupChat,
            avatar: groupChat ? member.slice(0, 3).flatMap(({ avatar }) => avatar.map(item => item.url)) : [otherMember.avatar.url],
            name: groupChat ? name : otherMember.name,
            members: member.reduce((prev, curr) => {
                if (curr.id.toString() !== req.user.id.toString()) {
                    prev.push(curr.id)
                }

                return prev
            }, [])

        }
    });

    res.status(200).json({
        success: true,
        chats: transformedChats,
    });


});

const getMyGroups = TryCatch(async (req, res, next) => {
    const { id } = req.user;
    const chats = await Chat.findAll({
        where: {
            // creator: id,
            groupChat: true,
            member: {
                [Op.contains]: [id.toString()],
            },
        },
    },
    );


    const uniqueMemberIds = [...new Set(chats.flatMap(chat => chat.member))];


    const users = await User.findAll({
        where: {
            id: {
                [Op.in]: uniqueMemberIds.map(id => parseInt(id)), // Convert back to integers
            },
        },
        attributes: ["id", "name", "avatar"],
    });

    const chatsWithUsers = chats.map(chat => {
        const chatData = chat.toJSON();
        chatData.member = chatData.member.map(memberId => {
            const user = users.find(u => u.id === parseInt(memberId));
            return user ? { id: user.id, name: user.name, avatar: user.avatar } : null;
        }).filter(Boolean);
        return chatData;
    });



    const transformedGroups = chatsWithUsers.map(({ id, name, member, groupChat }) => ({
        id,
        groupChat,
        avatar: member.slice(0, 3).flatMap(({ avatar }) =>
            Array.isArray(avatar) ? avatar.map(item => item.url) : []
        ),
        name,
    }));

    res.status(200).json({
        success: true,
        chats: transformedGroups,
    });


});

const addMembers = TryCatch(async (req, res, next) => {
    const { chatid, members } = req.body;

    const chat = await Chat.findOne({ where: { id: chatid } });

    if (!chat) {
        return next(new AppError("Chat not found", 404));
    }

    if (!chat.groupChat) {
        return next(new AppError("This is not a group chat", 400));
    }

    if (chat.creator.toString() !== req.user.id.toString()) {
        return next(new AppError("You are not allowed to add member", 403));
    }

    const users = await User.findAll({
        where: {
            id: {
                [Op.in]: members.map(id => parseInt(id)), // Convert back to integers
            },
        }
    });

    const newMemberIds = users.map(user => String(user.id));
    const uniqueMembers = [...chat.member, ...newMemberIds].reduce((acc, id) => {
        if (!acc.includes(id)) {
            acc.push(id);
        }
        return acc;
    }, []);

    chat.member = uniqueMembers;

    if (chat.member.length > 10) {
        return next(new AppError("Group member limit reached", 400));
    }

    await chat.save();

    const allUserName = users.map((i) => i.name).join(",");

    emitEvent(req, ALERT, chat.member, `${allUserName} has been add to the group`)

    emitEvent(req, REFETCH_CHATS, chat.member);

    res.status(200).json({
        success: true,
        message: "Members added sucessfully"
    });
})

const removeMember = TryCatch(async (req, res, next) => {
    const { userid, chatid } = req.body;

    const [chat, userThatWillBeRemoved] = await Promise.all([
        Chat.findOne({ where: { id: chatid } }),
        User.findOne({ where: { id: userid } })
    ]);

    if (!chat) {
        return next(new AppError("Chat not found", 404));
    }

    if (!chat.groupChat) {
        return next(new AppError("This is not a group chat", 400));
    }

    if (chat.creator.toString() !== req.user.id.toString()) {
        return next(new AppError("You are not allowed to remove member", 403));
    }

    if (chat.member.length < 3) {
        return next(new AppError("Group must have at least 3 members", 400));
    }

    if (!userThatWillBeRemoved) {
        return next(new AppError("User not exist", 404));
    }

    chat.member = chat.member.filter((item) => item.toString() != userid.toString());

    await chat.save();

    emitEvent(req, ALERT, chat.member, `${userThatWillBeRemoved.name} has been removed from the group.`)

    emitEvent(req, REFETCH_CHATS, chat.member);

    res.status(200).json({
        success: true,
        message: "Members removed sucessfully",

    });
});

const leaveMember = TryCatch(async (req, res, next) => {
    const { id: chatid } = req.params;

    if (!chatid) {
        return next(new AppError(`Please provide the chat id to leave`, 400))
    };

    const chat = await Chat.findOne({ where: { id: chatid } });

    if (!chat) {
        return next(new AppError("Chat not found", 404));
    }

    if (!chat.groupChat) {
        return next(new AppError("This is not a group chat", 400));
    }

    if (chat.creator.toString() !== req.user.id.toString()) {
        return next(new AppError("You are not allowed to add member", 403));
    }

    const remainingMembers = chat.member.filter((item) => item.toString() != req.user.id.toString());

    if (remainingMembers.length < 3) {
        return next(new AppError("Group must have at least 3 members", 400));
    }

    if (chat.creator.toString() === req.user.id.toString()) {
        const randomElement = Math.floor(Math.random() * remainingMembers.length)
        const newCreator = remainingMembers[randomElement];
        chat.creator = newCreator
    }

    chat.member = remainingMembers;

    await chat.save();

    emitEvent(req, ALERT, chat.member, `${req.user.name} has left the group.`)

    emitEvent(req, REFETCH_CHATS, chat.member);

    res.status(200).json({
        success: true,
        message: "Members leave sucessfully",

    });


})

const sendAttachments = TryCatch(async (req, res, next) => {
    const { chatid } = req.body;
    const { id, name, avatar } = req.user;

    if (!chatid) {
        return next(new AppError(`Please provide the chat id to send attachment`, 400))
    };

    const chat = await Chat.findOne({ where: { id: chatid } });
    // console.log("chat", chat)
    if (!chat) {
        return next(new AppError("Chat not found", 404));
    }

    const files = req.files || [];

    // if (files.length < 1) {
    //     return next(new AppError(`Please provide attachments`, 400));
    // }

    //upload attachements
    const attachments = [];

    const messageForDb = {
        content: "",
        attachments,
        senderId: id,
        chatId:chatid
    }

    const messageForRealTime = {
        ...messageForDb,
        sender: {
            id,
            name,
            // avatar: avatar.url,
        },
    };

    

    emitEvent(req, NEW_ATTACHEMENT, chat.members, {
        message: messageForRealTime,
        chatid
    });

    emitEvent(req, NEW_MESSAGE_ALERT, chat.members, {
        chatid
    });

    const messages = await Message.create(messageForDb);

    res.status(200).json({
        success: true,
        message: `Attachemnt sent successfully`,
        messages,
    })
})

module.exports = {
    newGroup,
    getMyChats,
    getMyGroups,
    addMembers,
    removeMember,
    leaveMember,
    sendAttachments,
}