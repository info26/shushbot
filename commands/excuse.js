const { AddOrRemoveExcused } = require("./../helpers/AddOrRemoveExcused")
const { getNick } = require('./../helpers/getNick')

async function excuse(msg) {
    guildMember = msg.member;
    cmd = msg.content.split(" ")
    if (cmd.size > 2) {
        msg.reply("(X) You have specified too many arguments. ")
        return;
    }
    if (guildMember.voice.channel == null) {
        msg.reply("(X) You are not in a voice channel. ")
        return;
    }

    //mod bypass for command. 
    console.log("statement result: " + guildMember.permissions.has(['MANAGE_GUILD']))
    if ((whospracticing[guildMember.voice.channel.id] != guildMember.id) && (guildMember.permissions.has(['MANAGE_GUILD']) == false)) {
        msg.reply("(X) You are not the one practicing! ")
        return;
    }
    //ok 3/3 checks have passed. 
    memberToUnmute = cmd[1]
        //extract numbers now. 
    match = cmd[1].match(/(\d+)/)
    if (match[0] == null) {
        msg.reply("(X) Invalid user. ")
        return;
    }
    console.log(match, memberToUnmute)
    const userToUnmute = guildMember.guild.members.cache.find(mem => mem.id === match[0]);
    if (userToUnmute == null) {
        msg.reply("(X) Invalid user. ")
        return;
    }
    if (userToUnmute.voice.channel == null) {
        msg.reply("(X) The user that you want to unmute is not in a voice channel. ")
        return;
    }
    if (userToUnmute.voice.channel.id != guildMember.voice.channel.id) {
        //then these users are in different channels
        msg.reply("(X) You are not in the same channel as the user that you referred to. ")
        return;
    }
    if (whospracticing[guildMember.voice.channel.id] == userToUnmute.id) {
        msg.reply("(X) You are practicing. ");
        return;
    }
    if (typeof whospracticing[guildMember.voice.channel.id + "excused"] !== 'undefined') {
        if (whospracticing[guildMember.voice.channel.id + "excused"].includes(userToUnmute.id)) {
            msg.reply("(X) This user is already excused");
            return;
        }
    }
    if (whospracticing[guildMember.voice.channel.id] == "upforgrabs") {
        msg.reply("(X) No one is practicing, therefore no one can be excused. ")
        return;
    }
    if (userToUnmute.id == guildMember.id && (guildMember.permissions.has(['MANAGE_GUILD']) == false)) {
        msg.reply("(X) You can't excuse yourself. ")
        return;
    }
    //all checks have passed.
    strUserExcused = "Okay, " + getNick(userToUnmute) + " has been excused";
    userToUnmute.voice.setMute(false, strUserExcused)
    msg.reply(strUserExcused)
    AddOrRemoveExcused("add", guildMember.voice.channel.id, userToUnmute.id);

}

module.exports = {
    excuse
}