const TryCatch = require("../../utils/TryCatch");
const { Chat, User, Sequelize } = require("../../models");
const AppError = require("../../utils/appError");
const { emitEvent } = require("../../utils/feature");
const { ALERT, REFETCH_CHATS } = require("../../constants/events");
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

module.exports = {
    newGroup,
    getMyChats,
    getMyGroups,
}