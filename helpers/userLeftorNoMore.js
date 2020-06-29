const {secondsToHoursAndMinutes, timePracticedInSeconds } = require('./TimeCalc');
const { updateUserRecord, updateServerRecord} = require('./../cloud/dbutils');


function userLeftorNoMore(voiceState) {
    
    var sendingchannelid = BROADCAST_CHANNELS[voiceState.channel.id]
    const msgchannel = voiceState.channel.guild.channels.cache.find(ch => ch.id === sendingchannelid);

    //time calc
    var timeInSeconds = timePracticedInSeconds(voiceState.channel.id)
    var resultReadable = secondsToHoursAndMinutes(timeInSeconds);
    //update user's time in the database and server total time
    updateUserRecord(whospracticing[voiceState.channel.id], timeInSeconds, whospracticing[voiceState.channel.id + "piece"]);
    updateServerRecord(timeInSeconds);
    //reset state of the practice room
    whospracticing[voiceState.channel.id] = "upforgrabs"
    whospracticing[voiceState.channel.id + "piece"] = null

    if (voiceState.channel.members.size >= 0) {
        msgchannel.send("The user who was practicing has left or does not want to practice anymore. The first person to say '$practice' will be able to practice. Room Name: " + voiceState.channel.name)
        msgchannel.send("They practiced for " + resultReadable[1] + " hours and " + resultReadable[0] + " minutes");
    }

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