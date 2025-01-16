export const samplechats = [
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "Shyam",
        _id: "1",
        groupChat: false,
        members: ["1", "2"]
    },

    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "Sumit ",
        _id: "2",
        groupChat: false,
        members: ["1", "2"]
    },

    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "Soumya",
        _id: "3",
        groupChat: false,
        members: ["1", "2"]
    }
];

export const sampleUsers = [
    {
        _id: 1,
        name: "Shyam",
        avatar: "Avatar1"
    },
    {
        _id: 2,
        name: "Suman",
        avatar: "Avatar2"
    },
    {
        _id: 3,
        name: "Monoj",
        avatar: "Avatar3"
    },
]

export const sampleNotification = [
    {
        sender: {
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            name: "Shyam Sahoo"
        },
        _id: "1",
    },
    {
        sender: {
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            name: "Dipu Sahoo"
        },
        _id: "2",
    },
]

export const sampleMessage = [
    {
        attachments: [
            {
                public_id: "aaassas",
                url: "https://www.w3schools.com/howto/img_avatar.png"
            },
        ],
        content: "Lauda ka message hai",
        _id: "sdsdsdssd",
        sender: {
            _id: "user._idsdss",
            name: "Chaman"
        },
        chat: "chatId",
        createdAt: "2024-02-12T10:41:30.630z"

    },
    {
        attachments: [
            {
                public_id: "aaassas",
                url: "https://www.w3schools.com/howto/img_avatar.png"
            },
        ],
        content: "Lauda ka message hai",
        _id: "sdsdsdssd",
        sender: {
            _id: "user._id",
            name: "Chaman2"
        },
        chat: "chatId",
        createdAt: "2024-02-12T10:41:30.630z"

    },
]

export const dashboardData = {
    users: [
        {
            name: "John Doe",
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            _id: "1",
            username: "john_doe",
            friends: 20,
            groups: 5
        },
        {
            name: "John Boi",
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            _id: "2",
            username: "john_boi",
            friends: 20,
            groups: 25
        },
    ],

    chats: [
        {
            name: "Labadbass Group",
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            _id: "1",
            groupChat: false,
            members: [{ id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" }, { id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" }],
            totalmembers: 2,
            totalMessages: 20,
            creator: {
                name: "John Doe",
                avatar: "https://www.w3schools.com/howto/img_avatar.png"
            }
        },
        {
            name: "John Boi",
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            _id: "2",
            groupChat: true,
            members: [{ id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" }, { id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" }],
            totalmembers: 2,
            totalMessages: 20,
            creator: {
                name: "John Boi",
                avatar: "https://www.w3schools.com/howto/img_avatar.png"
            }
        }
    ],

    messages: [{
        attachments: [{
            public_id: "daddd 1",
            url: "https://www.w3schools.com/howto/img_avatar.png"
        }],
        content: "lauda ka message he",
        _id: "fsfsdfsdfsdsssdf",
        sender: {
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            name: "Chaman"
        },
        chat: "chatId",
        groupChat: false,
        createdAt: "2024-02-12T10:41:30:630Z"
    },
    {
        attachments: [{
            public_id: "daddd 2",
            url: "https://www.w3schools.com/howto/img_avatar.png"
        }],
        content: "lauda ka message he",
        _id: "fsfsdfsdfsdsdddf",
        sender: {
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            name: "Chaman"
        },
        chat: "chatId",
        groupChat: true,
        createdAt: "2024-02-12T10:41:30:630Z"
    }]
}