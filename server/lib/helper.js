const getOtherMember = (members, userId) => {
    return members.find((member)=> member.id.toString() !== userId.toString());
};

module.exports = getOtherMember;