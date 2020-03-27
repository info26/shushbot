function userLeftorNoMore(member) {
    //calc time. 
    diff = Date.now() - whospracticing[voicechid + "starttime"];
    //this reprs milliseconds
    //convert to seconds. 
    diff = diff / 1000;
    //get minutes
    minutes = Math.round(diff / 60);
    hours = Math.round(minutes / 60)

    //END CALC TIME. 
    whospracticing[member.channel.id] = "upforgrabs"
    sendingchannelid = BROADCAST_CHANNELS[member.channel.id]
    const msgchannel = member.channel.guild.channels.cache.find(ch => ch.id === sendingchannelid);
    if (member.channel.members.size > 0) {
        msgchannel.send("The user who was practicing has left or does not want to practice anymore. The first person to say '!practice' will be able to practice. Room Name: " + member.channel.name)
        msgchannel.send("They practiced for " + hours + ":" + minutes);
    }
    whospracticing[member.channel.id + "piece"] = null
        //time to mute everyone who was excused by the user.
    if (typeof whospracticing[member.channel.id + "excused"] !== 'undefined') {
        dat = whospracticing[member.channel.id + "excused"]
        guild = member.member.guild;
        dat.forEach(memid => {
            const user = guild.members.cache.find(mem => mem.id === memid);
            if (user.voice.channel != null) {
                //user still in vc
                user.voice.setMute(true, "was excused, but the person practicing quit. ")
            }


        })
    }

    whospracticing[member.channel.id + "excused"] = [];
    // once you're done muting everybody, clear the list.  ^^^

}

module.exports = {
    userLeftorNoMore
}