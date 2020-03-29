const { userLeftorNoMore } = require('./../../helpers/userLeftorNoMore')


async function userLeave(newMember, oldMember) {
    //hey! user has left.
    //that's when we pick a new member to practice. 
    if (oldMember.member.id == whospracticing[oldMember.channel.id]) {
        //helper function. 
        userLeftorNoMore(oldMember)
    }
    //check if user was excused:
    if (typeof whospracticing[oldMember.channel.id + "excused"] !== 'undefined') {
        if (whospracticing[oldMember.channel.id + "excused"].includes(oldMember.member.id)) {
            //remove user from list. 
            whospracticing[oldMember.channel.id + "excused"].remove(oldMember.member.id);
            console.log("removed member from excused list: " + oldMember.member.id)
        }
    }
}
module.exports = {
    userLeave
}