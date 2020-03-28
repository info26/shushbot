async function userJoin(newMember, oldmember) {
    console.log("new user joined")
    console.log(newMember.channel.id)
    if (APPLIED_CHANNELS.includes(newMember.channel.id) == false) {
        newMember.member.voice.setMute(false, "unmute because he/she is in a channel which the bot doesn't manage. ")
        console.log(newMember.member.id + " unmute because he/she is in a channel which the bot doesn't manage. ")
    } else {
        //MANAGE THIS USER
        if (newMember.channel.members.size == 1 && APPLIED_CHANNELS.includes(newMember.channel.id)) {
            newMember.member.voice.setMute(false, "unmute because he/she is the only user in the channel.")
            whospracticing[newMember.channel.id] = newMember.member.id;
            whospracticing[newMember.channel.id + "piece"] = null;
            //set the starting time. 
            whospracticing[newMember.channel.id + "starttime"] = Date.now();
        } else {
            //member is listening
            newMember.member.voice.setMute(true, "mute because he/she is listening")
            console.log(newMember.member.id + " mute because he/she is listening channel size: " + newMember.channel.members.size + "==" + newMember.channel.id)
        }
    }
}

module.exports = {
    userJoin
}