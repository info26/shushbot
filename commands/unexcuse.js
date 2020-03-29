const { AddOrRemoveExcused } = require("./../helpers/AddOrRemoveExcused")
const { getNick } = require('./../helpers/getNick')

async function unexcuse(msg) {
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
    // mod bypass for cmd. 
    if ((whospracticing[guildMember.voice.channel.id] != guildMember.id) && (guildMember.permissions.has(['MANAGE_GUILD']) == false)) {
        msg.reply("(X) You are not the one practicing! ")
        return;
    }
    //ok 3/3 checks have passed. 
    memberToMute = cmd[1]
        //extract numbers now. 
    match = cmd[1].match(/(\d+)/)
    if (match[0] == null) {
        msg.reply("(X) Invalid user. ")
        return;
    }
    console.log(match, memberToMute)
    const userToMute = guildMember.guild.members.cache.find(mem => mem.id === match[0]);
    if (userToMute == null) {
        msg.reply("(X) Invalid user. ")
        return;
    }
    if (userToMute.voice.channel == null) {
        msg.reply("(X) The user that you want to mute is not in a voice channel. ")
        return;
    }
    if (userToMute.voice.channel.id != guildMember.voice.channel.id) {
        //then these users are in different channels
        msg.reply("(X) You are not in the same channel as the user that you referred to. ")
        return;
    }
    if (userToMute.id == guildMember.id && (guildMember.permissions.has(['MANAGE_GUILD']) == false)) {
        msg.reply("(X) You can't mute yourself. ")
        return;
    }
    if (whospracticing[guildMember.voice.channel.id] == userToMute.id) {
        msg.reply("(X) You are practicing. ");
        return;
    }
    //this massive if statement basically tests if the user is excused. . 
    if (typeof whospracticing[guildMember.voice.channel.id + "excused"] !== 'undefined') {
        if (whospracticing[guildMember.voice.channel.id + "excused"].includes(userToMute.id) == false) {
            msg.reply("(X) This user is not excused");
            return;
        }
    }
    //all checks have passed.
    strUserUnexcused =  "Okay, " + getNick(userToMute) + " has been unexcused";
    userToMute.voice.setMute(true, strUserUnexcused)
    msg.reply(strUserUnexcused)

    AddOrRemoveExcused("remove", guildMember.voice.channel.id, userToMute.id);


}

module.exports = {
    unexcuse
}