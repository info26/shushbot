const {secondsToHoursAndMinutes, timePracticed } = require('./TimeCalc');
const { update, insert} = require('./../cloud/dbutils');


function userLeftorNoMore(voiceState) {
    whospracticing[voiceState.channel.id] = "upforgrabs"
    sendingchannelid = BROADCAST_CHANNELS[voiceState.channel.id]
    const msgchannel = voiceState.channel.guild.channels.cache.find(ch => ch.id === sendingchannelid);

    //time calc
    result = secondsToHoursAndMinutes(timePracticed(voiceState.channel.id));
    if (voiceState.channel.members.size > 0) {
        msgchannel.send("The user who was practicing has left or does not want to practice anymore. The first person to say '$practice' will be able to practice. Room Name: " + voiceState.channel.name)
        msgchannel.send("They practiced for " + result[1] + " hours and " + result[0] + " minutes");
    }
    whospracticing[voiceState.channel.id + "piece"] = null



    //time to mute everyone who was excused by the user.
    if (typeof whospracticing[voiceState.channel.id + "excused"] !== 'undefined') {
        membersExcused = whospracticing[voiceState.channel.id + "excused"]
        //finds server of the current user
        guild = voiceState.member.guild;
        membersExcused.forEach(memid => {
            //find user associated with that id in that server
            const user = guild.members.cache.find(mem => mem.id === memid);
            if (user.voice.channel != null) {
                //user still in vc
                user.voice.setMute(true, "was excused, but the person practicing quit. ")
            }
        })
    }

    whospracticing[voiceState.channel.id + "excused"] = [];
    // once you're done muting everybody, clear the list.  ^^^

}

module.exports = {
    userLeftorNoMore
}