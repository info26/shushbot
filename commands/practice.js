const Discord = require('discord.js')


async function practice(msg) {
    if (msg.member.voice.channel == null) {
        msg.reply("(X) You aren't in a voice channel")
    } else {
        // user is in a voice channel.
        practicing = whospracticing[msg.member.voice.channel.id]

        if (practicing == msg.author.id) {
            msg.reply("(X) You are practicing")

        } else if (practicing != "upforgrabs" || !msg.member.voice.channel.id in whospracticing) {
            msg.reply("(X) The channel already has someone practicing")

        } else if (practicing == "upforgrabs") {
            msg.reply("Ok, you're now practicing. ")
            msg.member.voice.setMute(false, "user requested to be practicing. ")
            whospracticing[msg.member.voice.channel.id] = msg.author.id;
            whospracticing[msg.member.voice.channel.id + "piece"] = null
        }
    }
};

module.exports = {
    practice
}