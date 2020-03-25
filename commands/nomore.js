const Discord = require('discord.js')

async function nomore(msg) {
    voicechannel = msg.member.voice;
    if (voicechannel.channel == null) {
        msg.reply("(X) You aren't in a voice channel")
    } else if (msg.author.id == whospracticing[voicechannel.channel.id]) {
        msg.reply("Ok, you're no longer practicing.")
        msg.member.voice.setMute(true, "user is no longer practicing")
        whospracticing[voicechannel.channel.id] = "upforgrabs"
        sendingchannelid = BROADCAST_CHANNELS[voicechannel.channel.id]
        const msgchannel = msg.member.guild.channels.cache.find(ch => ch.id === sendingchannelid);

        msgchannel.send("The user who was practicing has left or does not want to practice anymore. The first person to say '!practice' will be able to practice. Room Name: " + voicechannel.channel.name)
        whospracticing[voicechannel.channel.id + "piece"] = null;
    } else {
        msg.reply("(X) You're not the one practicing!")
    }
}


module.exports = {
    nomore
}