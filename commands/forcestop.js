const Discord = require('discord.js')

function forcestop(msg) {
    if (msg.member.voice.channel == null) {
        msg.reply("(X) You aren't in a channel")
    } else if (msg.member.permissions.has(['MANAGE_GUILD']) == false) {
        msg.reply("(X) You don't have permission")
    } else if (whospracticing[msg.member.voice.channel.id] == null || whospracticing[msg.member.voice.channel.id] == "upforgrabs") {
        msg.reply("(X) No one is currently practicing in your channel. ")
    } else {
        currentpracticingid = whospracticing[msg.member.voice.channel.id]
        userpracticing = msg.member.guild.members.cache.find(mem => mem.id == currentpracticingid);
        voicechannel = userpracticing.voice;
        voicechannel.setMute(true, "moderator executed command. ")
        whospracticing[voicechannel.channel.id] = "upforgrabs"
        sendingchannelid = BROADCAST_CHANNELS[voicechannel.channel.id]
        const msgchannel = msg.member.guild.channels.cache.find(ch => ch.id === sendingchannelid);
        msgchannel.send("A mod has stopped the user currently playing. The first person to say '!practice' will be able to practice. Room Name: " + voicechannel.channel.name)
        msg.reply("Done. ")
        whospracticing[voicechannel.channel.id + "piece"] = null
    }
}
module.exports = {
    forcestop
}