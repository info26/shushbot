const Discord = require('discord.js')

async function nomore(msg) {
    voicechannel = msg.member.voice;
	console.log(whospracticing[voicechannel.channel.id])
	console.log(whospracticing[msg.member.voice.channel.id + "excusedusers"])
    if (voicechannel.channel == null) {
        msg.reply("(X) You aren't in a voice channel")
    } else if (msg.author.id == whospracticing[voicechannel.channel.id]) {
		if (whospracticing[msg.member.voice.channel.id + "excusedusers"] != undefined){
			excused_users = whospracticing[msg.member.voice.channel.id + "excusedusers"].split(", ")
			console.log(excused_users)
			for(i = 0; i < excused_users.length; i++){	
				const muteduser = msg.member.guild.members.cache.find(mem => mem.id === excused_users[i]);
				console.log(muteduser)
				muteduser.voice.setMute(true, "practicer has stopped practicing and excused members have been unexcused and muted")
			}
			whospracticing[msg.member.voice.channel.id + "excusedusers"] = "";
		}
        msg.reply("Ok, you're no longer practicing.")
        msg.member.voice.setMute(true, "user is no longer practicing")
        whospracticing[voicechannel.channel.id] = "upforgrabs"
        sendingchannelid = BROADCAST_CHANNELS[voicechannel.channel.id]
        const msgchannel = msg.member.guild.channels.cache.find(ch => ch.id === sendingchannelid);
        msgchannel.send("The user who was practicing has left or does not want to practice anymore. All excused members have been unexcused and muted. The first person to say '!practice' will be able to practice. Room Name: " + voicechannel.channel.name)
        whospracticing[voicechannel.channel.id + "piece"] = null;
		
    } else {
        msg.reply("(X) You're not the one practicing!")
    }
}


module.exports = {
    nomore
}