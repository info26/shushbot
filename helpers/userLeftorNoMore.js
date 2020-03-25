function userLeftorNoMore(member) {
    whospracticing[member.channel.id] = "upforgrabs"
    sendingchannelid = BROADCAST_CHANNELS[member.channel.id]
    const msgchannel = member.channel.guild.channels.cache.find(ch => ch.id === sendingchannelid);
    if (member.channel.members.size > 0) {
        msgchannel.send("The user who was practicing has left or does not want to practice anymore. The first person to say '!practice' will be able to practice. Room Name: " + member.channel.name)
    }
    whospracticing[member.channel.id + "piece"] = null
}

module.exports = {
    userLeftorNoMore
}