const Discord = require('discord.js')
const { userLeftorNoMore } = require('./../helpers/userLeftorNoMore')
const { getNick } = require('./../helpers/getNick')

function forcestop(msg) {
    if (msg.member.voice.channel == null) {
        msg.reply("(X) You aren't in a channel")
    } else if (msg.member.permissions.has(['MANAGE_GUILD']) == false) {
        msg.reply("(X) You don't have permission")
    } else if (whospracticing[msg.member.voice.channel.id] == null || whospracticing[msg.member.voice.channel.id] == "upforgrabs") {
        msg.reply("(X) No one is currently practicing in your channel. ")
    } else {
        currPracticingId = whospracticing[msg.member.voice.channel.id]
        userPracticing = msg.member.guild.members.cache.find(mem => mem.id == currPracticingId);
        userVoice = userPracticing.voice;
        userVoice.setMute(true, "moderator executed command to forcestop. ")
        const userPlaying = msg.member.guild.members.cache.find(mem => mem.id === whospracticing[msg.member.voice.channel.id]);
        nickUserP = getNick(userPlaying)
        msg.reply("Done. " + nickUserP + " has stopped practicing by mod's command");
        userLeftorNoMore(userVoice);

    }
}
module.exports = {
    forcestop
}