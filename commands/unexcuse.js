const { AddOrRemoveExcused } = require("./../helpers/AddOrRemoveExcused")

async function unexcuse(msg) {
    guildmem = msg.member;
    cmd = msg.content.split(" ")
    if (cmd.size > 2) {
        msg.reply("(X) You have specified too many arguments. ")
        return;
    }
    if (msg.member.voice.channel == null) {
        msg.reply("(X) You are not in a voice channel. ")
        return;
    }
    if (whospracticing[msg.member.voice.channel.id] != msg.member.id) {
        msg.reply("(X) You are not the one practicing! ")
        return;
    }
    //ok 3/3 checks have passed. 
    membertomuteid = cmd[1]
        //extract numbers now. 
    match = cmd[1].match(/(\d+)/)
    if (match[0] == null) {
        msg.reply("(X) Invalid user. ")
        return;
    }
    console.log(match, membertomuteid)
    const usertomute = msg.member.guild.members.cache.find(mem => mem.id === match[0]);
    if (usertomute == null) {
        msg.reply("(X) Invalid user. ")
        return;
    }
    if (usertomute.voice.channel == null) {
        msg.reply("(X) The user that you want to mute is not in a voice channel. ")
        return;
    }
    if (usertomute.voice.channel.id != msg.member.voice.channel.id) {
        //then these users are in different channels
        msg.reply("(X) You are not in the same channel as the user that you referred to. ")
        return;
    }
    if (usertomute.id == msg.member.id) {
        msg.reply("(X) You can't mute yourself. ")
        return;
    }
    //this massive if statement basically tests if the user is excused. . 
    if (typeof whospracticing[msg.member.voice.channel.id + "excused"] !== 'undefined') {
        if (whospracticing[msg.member.voice.channel.id + "excused"].includes(usertomute.id) == false) {
            msg.reply("(X) This user is not excused");
            return;
        }
    }
    //all checks have passed.
    usertomute.voice.setMute(true, "User practicing unexcused user. ")
    msg.reply("Ok, muted. ")

    AddOrRemoveExcused("remove", msg.member.voice.channel.id, usertomute.id);


}

module.exports = {
    unexcuse
}