const Discord = require('discord.js')


function practice(msg) {
	if (APPLIED_CHANNELS.includes(msg.member.voice.channel.id) == false) {
		msg.reply("(X) Not in a channel the bot manages")
		return;
	}
    else if (msg.member.voice.channel == null || !msg.member.voice.channel.id in APPLIED_CHANNELS) {
        msg.reply("(X) You aren't in a voice channel")
    } else if {
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
            whospracticing[msg.member.voice.channel.id + "piece"] = null;
            whospracticing[msg.member.voice.channel.id + "starttime"] = Date.now();
        }
    }
};


module.exports = {
    practice
}