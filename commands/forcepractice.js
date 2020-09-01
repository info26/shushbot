const Discord = require('discord.js')
const { getNick } = require('./../helpers/getNick')
const { userLeftorNoMore } = require('./../helpers/userLeftorNoMore')

function forcepractice(msg) {
    //USE msg.content !! msg is not a string. it's a discord.js MESSAGE object. 
    cmd = msg.content.split(" ")
    console.log(cmd)
	if (APPLIED_CHANNELS.includes(msg.member.voice.channel.id) == false) {
		msg.reply("(X) Not in a channel the bot manages")
		return;
	}
    else if (cmd.length > 2) {
        msg.reply("(X) You have specified too many arguments. ")
    } else if (msg.member.voice.channel == null) {
        msg.reply("(X) You aren't in a voice channel")
    } else if (msg.member.permissions.has(['MANAGE_GUILD'])) {
        // matches all numbers from the string. 
        match = cmd[1].match(/(\d+)/);
        if (match == null) {
            //null check
            msg.reply("(X) Invalid user. ");
            return;
        };
        cmd[1] = match[0];
        console.log(cmd);
        const userMentioned = msg.member.guild.members.cache.find(mem => mem.id === cmd[1]);
        // mod's voice channel
        var modVoiceCh = msg.member.voice.channel;
        if (userMentioned == null) {
            msg.reply("(X) Invalid user. ")
        } else if (modVoiceCh.id != userMentioned.voice.channel.id) {
            //HEY! these users are in different channels. 
            msg.reply("(X) The user that you referred to is in a different channel. ")
        } else {
            userMentionedCh = userMentioned.voice;
            if (userMentionedCh.channel == null && whospracticing[modVoiceCh.id] != "upforgrabs") {
                msg.reply("(X) The user you mentioned isn't in a voice channel")
            } else if (whospracticing[modVoiceCh.id] == "upforgrabs" || whospracticing[modVoiceCh.id] == null) {
                userMentionedCh.setMute(false, "operation performed by moderator")
                    //update whospracticing
                whospracticing[modVoiceCh.id] = userMentionedCh.id
                msg.reply("Done. ")
                whospracticing[modVoiceCh.id + "piece"] = null;
            } else {
                // all checks completed. 
                userCurrPracticingId = whospracticing[modVoiceCh.id]
                const userPlaying = msg.member.guild.members.cache.find(mem => mem.id === userCurrPracticingId);
                userLeftorNoMore(userPlaying.voice);
                whospracticing[modVoiceCh.id] = userMentionedCh.id
                userPlaying.voice.setMute(true, "operation performed by moderator")
                userMentionedCh.setMute(false, "operation performed by moderator")
                nickUserP = getNick(userMentioned)
                msg.reply("Done. " + nickUserP + " is now practicing because of a mod's request. ")
                whospracticing[modVoiceCh.id + "piece"] = null;
                whospracticing[modVoiceCh.id + "starttime"] = Date.now();

                //ok we need to update who is unmuted. aka excused people. 
                if (typeof whospracticing[modVoiceCh.id + "excused"] !== 'undefined') {
                    excusedUserIds = whospracticing[modVoiceCh.id + "excused"]
                    guild = msg.member.guild;
                    excusedUserIds.forEach(memid => {
                        const user = guild.members.cache.find(mem => mem.id === memid);
                        //don't mute the user who is practicing. 
                        if (user.voice.channel != null && userMentionedCh.member.id != user.id) {
                            //user still in vc
                            user.voice.setMute(true, "was excused, but the person practicing quit. ")
                        }
                    })
                }

            }
        }
    } else {
        msg.reply("(X) You do not have permission. ")
    }
}

module.exports = {
    forcepractice
}
