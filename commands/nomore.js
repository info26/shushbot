const Discord = require('discord.js')
const { userLeftorNoMore } = require('./../helpers/userLeftorNoMore')

function nomore(msg) {
    voiceObject = msg.member.voice;
    if (voiceObject.channel == null) {
        msg.reply("(X) You aren't in a voice channel")
    } else if (msg.author.id == whospracticing[voiceObject.channel.id]) {
        msg.reply("Ok, you're no longer practicing.");
        msg.member.voice.setMute(true, "user is no longer practicing");
        userLeftorNoMore(voiceObject);
    } else {
        msg.reply("(X) You're not the one practicing!")
    }
}

module.exports = {
    nomore
}