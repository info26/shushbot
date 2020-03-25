function userMove(newMember, oldMember) {
    // user has switched channels // or unrelated update. 
    if (newMember.channel.id != oldMember.channel.id) {
        //for if this user WAS practicing. 
        if (whospracticing[oldMember.channel.id] != null & oldMember.member.id == whospracticing[oldMember.channel.id]) {
            whospracticing[oldMember.channel.id] = "upforgrabs"
            sendingchannelid = BROADCAST_CHANNELS[oldMember.channel.id]
            const msgchannel = oldMember.channel.guild.channels.cache.find(ch => ch.id === sendingchannelid);
            if (oldMember.channel.members.size > 0) {
                msgchannel.send("The user who was practicing has left or does not want to practice anymore. The first person to say '!practice' will be able to practice. Room Name: " + oldMember.channel.name)
            }
            whospracticing[oldMember.channel.id] = null
        }
        console.log("new user joined")
        console.log(newMember.channel.id)
        if (APPLIED_CHANNELS.includes(newMember.channel.id) == false) {
            newMember.member.voice.setMute(false, "unmute because he/she is in a channel which the bot doesn't manage. ")
            console.log(newMember.member.id + " unmute because he/she is in a channel which the bot doesn't manage. ")
        } else {
            //MANAGE THIS USER
            if (newMember.channel.members.size == 1 & APPLIED_CHANNELS.includes(newMember.channel.id)) {
                if (whospracticing[newMember.channel.id] == "upforgrabs") {
                    newMember.member.voice.setMute(false, "unmute because the channel is up for grabs. (no one is practicing)")
                    console.log(newMember.member.id + " unmute because the channel is up for grabs. (no one is practicing)")
                    whospracticing[newMember.channel.id] = newMember.member.id;
                    whospracticing[newMember.channel.id + "piece"] = null
                } else {
                    newMember.member.voice.setMute(false, "unmute because the channel is up for grabs. (no one is practicing)")
                    whospracticing[newMember.channel.id] = newMember.member.id;
                    console.log(whospracticing)
                    console.log(newMember.member.id + " unmute because he/she is the only user in the channel.")
                    whospracticing[newMember.channel.id + "piece"] = null
                }
            } else {
                //member is listening
                newMember.member.voice.setMute(true, "auto mute")
                console.log(newMember.member.id + " mute because he/she is listening channel size: " + newMember.channel.members.size + "==" + newMember.channel.id)
            }
        }
    } else {
        console.log("unnecessary update avoided yay!")
    }
}
module.exports = {
    userMove
}