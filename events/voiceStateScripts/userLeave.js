const { userLeftorNoMore } = require('./../../helpers/userLeftorNoMore')


async function userLeave(newMember, oldMember) {
    //hey! user has left.
    //that's when we pick a new member to practice. //
    //channel.sendmessage(hey who wants to practice
    if (oldMember.member.id == whospracticing[oldMember.channel.id]) {
        // whospracticing[oldMember.channel.id] = "upforgrabs"
        // sendingchannelid = BROADCAST_CHANNELS[oldMember.channel.id]
        // const msgchannel = oldMember.channel.guild.channels.cache.find(ch => ch.id === sendingchannelid);
        // if (oldMember.channel.members.size > 0) {
        //     msgchannel.send("The user who was practicing has left or does not want to practice anymore. The first person to say '!practice' will be able to practice. Room Name: " + oldMember.channel.name)
        // }
        // whospracticing[oldMember.channel.id] = null

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