const { AddOrRemoveExcused } = require("./../helpers/AddOrRemoveExcused")

async function excuse(msg) {
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
    membertounmuteid = cmd[1]
        //extract numbers now. 
    match = cmd[1].match(/(\d+)/)
    if (match[0] == null) {
        msg.reply("(X) Invalid user. ")
        return;
    }
    console.log(match, membertounmuteid)
    const usertounmute = msg.member.guild.members.cache.find(mem => mem.id === match[0]);
    if (usertounmute == null) {
        msg.reply("(X) Invalid user. ")
        return;
    }
    if (usertounmute.voice.channel == null) {
        msg.reply("(X) The user that you want to unmute is not in a voice channel. ")
        return;
    }
    if (usertounmute.voice.channel.id != msg.member.voice.channel.id) {
        //then these users are in different channels
        msg.reply("(X) You are not in the same channel as the user that you referred to. ")
        return;
    }
    if (typeof whospracticing[msg.member.voice.channel.id + "excused"] !== 'undefined') {
        if (whospracticing[msg.member.voice.channel.id + "excused"].includes(usertounmute.id)) {
            msg.reply("(X) This user is already excused");
            return;
        }
    }
    if (usertounmute.id == msg.member.id) {
        msg.reply("(X) You can't excuse yourself. ")
        return;
    }
    //all checks have passed.
    usertounmute.voice.setMute(false, "User practicing excused user. ")
    msg.reply("Ok, unmuted")
    AddOrRemoveExcused("add", msg.member.voice.channel.id, usertounmute.id);

}

module.exports = {
    excuse
}