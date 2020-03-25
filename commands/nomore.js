const Discord = require('discord.js')
const { userLeftorNoMore } = require('./../helpers/userLeftorNoMore')

async function nomore(msg) {
    voiceObject = msg.member.voice;
    if (voiceObject.channel == null) {
        msg.reply("(X) You aren't in a voice channel")
    } else if (msg.author.id == whospracticing[voiceObject.channel.id]) {
        // msg.reply("Ok, you're no longer practicing.")

        //this is required. 
        msg.member.voice.setMute(true, "user is no longer practicing")


        // whospracticing[voiceObject.channel.id] = "upforgrabs"
        // sendingchannelid = BROADCAST_CHANNELS[voiceObject.channel.id]
        // const msgchannel = msg.member.guild.channels.cache.find(ch => ch.id === sendingchannelid);
        // msgchannel.send("The user who was practicing has left or does not want to practice anymore. The first person to say '!practice' will be able to practice. Room Name: " + voiceObject.channel.name)
        // whospracticing[voiceObject.channel.id + "piece"] = null;
        userLeftorNoMore(voiceObject);


    } else {
        msg.reply("(X) You're not the one practicing!")
    }
}


module.exports = {
    nomore
}