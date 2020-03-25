const Discord = require('discord.js')

function np(msg) {
    if (msg.member.voice.channel == null) {
        msg.reply("(X) You aren't in a voice channel");
    } else {
        voicechid = msg.member.voice.channel.id;
		console.log(whospracticing[voicechid])
        userplaying = whospracticing[voicechid]
        if (userplaying == null || userplaying == "upforgrabs") {
            msg.reply("No one is practicing at the moment. ")
			return;
        }
        userobject = msg.member.guild.members.cache.find(mem => mem.id == userplaying);
        piecename = whospracticing[voicechid + "piece"]
            // user object is the User object. and the userplaying is the user's id. 
        if (piecename == null) {
            msg.reply(userobject.user.username + " is currently playing ")
        } else {
            msg.reply(userobject.user.username + " is currently playing" + piecename)
        }
    }
}

module.exports = {
    np
}