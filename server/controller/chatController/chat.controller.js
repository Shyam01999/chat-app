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

    if (members.lenght < 2) {
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
    // const chats = await Chat.findAll({ members: req.user }).populate("members", "name avatar");
    const { id } = req.user;
    const chats = await Chat.findAll({
        where: {
            member: { 
                [Op.contains]: [id], 
            }, // Ensures members exist
        },

        include: [
            {
                model: User, // Assuming you have a User model
                attributes: ['id', 'name', 'avatar'], // Include only these fields
                where: {
                    id: {
                        [Op.in]: Sequelize.col('Chat.member'), // Filter users whose IDs are in the member array
                    },
                },
                required: false, // Use `false` to include chats even if no matching users are found
            },
        ],
    },
    );


    // console.log("chat", chats)

    res.status(200).json({
        success: true,
        chats: chats,
    })

    // const transformedChats = chats.map(({_id, name, members, groupChat})=> {
    //     const otherMember = getOtherMember(members, req.user);

    //     return {
    //         _id,
    //         groupChat,
    //         avatar: groupChat?members.slice(0, 3).map(({avatar}) => avatar.url):otherMember,
    //         name:groupChat ? name: otherMember.name,
    //         members:members.reduce((prev, curr)=> {

    //             if(curr.id.toString() !== req.user.toString()){
    //                 prev.push(curr.name)
    //             }
    //             return prev
    //         }, [])

    //     }
    // })
});

module.exports = {
    newGroup,
    getMyChats,
}