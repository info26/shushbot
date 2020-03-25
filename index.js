//custom discord bot for managing server unmutes and mutes. 


const Discord = require('discord.js');
const client = new Discord.Client();
whospracticing = {}
//Paste in IDs of your voice channels that you want the bot to manage. 
//Make sure that it is a string. 

APPLIED_CHANNELS = [
	"691725669326913747", 
	"691719071619874816", 
	"692002216957051030"
]
BROADCAST_CHANNELS = {
	"691725669326913747": "691808798817517600",
	"691719071619874816": "691808874910449734",
	"692002216957051030": "691808874910449734"
}


client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});
client.on('message', async msg => {
	if (msg.content === '!practice') {
		// send a message.
		if (msg.member.voice.channel == null){
			msg.reply("(X) You aren't in a voice channel")
		} else {
			// user is in a voice channel.
			practicing = whospracticing[msg.member.voice.channel.id]
			
			if (practicing == msg.author.id) {
				msg.reply("(X) You are practicing")
				
			} else if (practicing != "upforgrabs" || !msg.member.voice.channel.id in whospracticing) {
				msg.reply("(X) The channel already has someone practicing")
				
			} else if (practicing == "upforgrabs") {
				msg.reply("Ok, you're now practicing. ")
				msg.member.voice.setMute(false, "user requested to be practicing. ")
				whospracticing[msg.member.voice.channel.id] = msg.author.id;
				whospracticing[newMember.channel.id+"piece"] = null
			}
		}
	};
	if (msg.content === '!nomore') {
		
		voicechannel = msg.member.voice;
		if (voicechannel.channel == null){
			msg.reply("(X) You aren't in a voice channel")
		} else if (msg.author.id == whospracticing[voicechannel.channel.id]) {
			msg.reply("Ok, you're no longer practicing.")
			msg.member.voice.setMute(true, "user is no longer practicing")
			whospracticing[voicechannel.channel.id] = "upforgrabs"
			sendingchannelid = BROADCAST_CHANNELS[voicechannel.channel.id]
			const msgchannel = msg.member.guild.channels.cache.find(ch => ch.id === sendingchannelid);
			
			msgchannel.send("The user who was practicing has left or does not want to practice anymore. The first person to say '!practice' will be able to practice. Room Name: " + voicechannel.channel.name) 
			whospracticing[voicechannel.channel.id + "piece"] = null;
		} else {
			msg.reply("(X) You're not the one practicing!")
		}
	};
	if (msg.content.startsWith('!forcepractice')) {
		//USE msg.content !! msg is not a string. it's a discord.js MESSAGE object. 
		cmd = msg.content.split(" ")
		console.log(cmd)
		if (cmd.length > 2) {
			msg.reply("(X) You have specified too many arguments. ")
		} else if (msg.member.voice.channel == null) {
			msg.reply("(X) You aren't in a voice channel")
		} else if (msg.member.permissions.has(['MANAGE_GUILD'])) {
			
			
			cmd[1] = cmd[1].match(/(\d+)/)[0]
			console.log(cmd)
			const usermentioned = msg.member.guild.members.cache.find(mem => mem.id === cmd[1]);
			
			modvoicech = msg.member.voice.channel;
			if (usermentioned == null) {
				msg.reply("(X) Invalid user. ")
			} else {
				usermentionedch = usermentioned.voice;
				if (usermentionedch.channel == null & whospracticing[modvoicech.id] != "upforgrabs") {
					msg.reply("(X) The user you mentioned isn't in a voice channel")
				} else if (whospracticing[modvoicech.id] == "upforgrabs") {
					usermentionedch.setMute(false, "operation performed by moderator")
					//update whospracticing
					whospracticing[modvoicech.id] = usermentionedch.id
					msg.reply("Done. ")
					whospracticing[modvoicech.id + "piece"] = null;
				} else {
					// all checks completed. 
					usercurpracticing = whospracticing[modvoicech.id]
					const userplaying = msg.member.guild.members.cache.find(mem => mem.id === usercurpracticing);
					// DO IT
					whospracticing[modvoicech.id] = usermentionedch.id
					userplaying.voice.setMute(true, "operation performed by moderator")
					usermentionedch.setMute(false, "operation performed by moderator")
					msg.reply("Done. ")
					whospracticing[modvoicech.id + "piece"] = null;
					
				}
			}
		} else {
			msg.reply("(X) You do not have permission. ")
		}
	}
	if (msg.content === "!forcestop") {
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
			whospracticing[voicechannel.channel.id] = null
		}
	};
	if (msg.content == "!np") {
		if (msg.member.voice.channel == null) {
			msg.reply("(X) You aren't in a voice channel");
		} else {
			voicechid = msg.member.voice.channel.id;
			userplaying = whospracticing[voicechid]
			if (userplaying == null || userplaying == "upforgrabs") {
				msg.reply("No one is practicing at the moment. ")
			}
				userobject = msg.member.guild.members.cache.find(mem => mem.id == userplaying);
				piecename = whospracticing[voicechid + "piece"]
				// user object is the User object. and the userplaying is the user's id. 
				if (piecename == null) {
					msg.reply(userobject.user.username + " is currently playing ")
				} else {
					msg.reply(userobject.user.username + " is currently playing " + piecename)
				}
		}
		
	}
	if (msg.content.startsWith('!song')) {
		//USE msg.content !! msg is not a string. it's a discord.js MESSAGE object. 
		cmd = msg.content.split(" ")
		console.log(cmd)
		if (msg.member.voice.channel == null) {
			msg.reply("(X) You aren't in a voice channel")
		} else if (msg.member.id != whospracticing[msg.member.voice.channel.id]) {
			// check if user is the user practicing. 
			msg.reply("(X) You aren't practicing. ")
		} else {
			whospracticing[msg.member.voice.channel.id + "piece"] = msg.content.replace("!song", "");
			msg.reply("Done. ");
		}
	}
	
	
});
client.on('voiceStateUpdate', async (oldMember, newMember) => {
	let newUserChannel = newMember;
	let oldUserChannel = oldMember;
	if ((newUserChannel.channel != null & oldUserChannel.channel == null)) {
			console.log("new user joined")
			console.log(newMember.channel.id)
			if (APPLIED_CHANNELS.includes(newMember.channel.id) == false) {
				newMember.member.voice.setMute(false, "unmute because he/she is in a channel which the bot doesn't manage. ")
				console.log(newUserChannel.member.id + " unmute because he/she is in a channel which the bot doesn't manage. ")
			} else {
			//MANAGE THIS USER
				if (newUserChannel.channel.members.size == 1 & APPLIED_CHANNELS.includes(newMember.channel.id)) {
					if (whospracticing[newMember.channel.id] == "upforgrabs"){
						newMember.member.voice.setMute(false, "unmute because the channel is up for grabs. (no one is practicing)")
						console.log(newUserChannel.member.id + " unmute because the channel is up for grabs. (no one is practicing)")
						whospracticing[newMember.channel.id] = newUserChannel.member.id;
						whospracticing[newMember.channel.id+"piece"] = null
					} else {
						newMember.member.voice.setMute(false, "unmute because he/she is the only user in the channel.")
						whospracticing[newMember.channel.id] = newMember.member.id;
						console.log(whospracticing)
						console.log(newUserChannel.member.id + " unmute because he/she is the only user in the channel.")
						whospracticing[newMember.channel.id+"piece"] = null
					}

				} else {
					//member is listening
					newMember.member.voice.setMute(true, "mute because he/she is listening")
					console.log(newUserChannel.member.id + " mute because he/she is listening channel size: " + newUserChannel.channel.members.size + "==" + newUserChannel.channel.id)
				}
			}
	}
	if ((newUserChannel.channel != null & oldUserChannel.channel != null)){
		// user has switched channels // or unrelated update. 
		if (newMember.channel.id != oldMember.channel.id){
			//for if this user WAS practicing. 
			if (whospracticing[oldMember.channel.id] != null & oldMember.member.id == whospracticing[oldMember.channel.id]){
				whospracticing[oldMember.channel.id] = "upforgrabs"
				sendingchannelid = BROADCAST_CHANNELS[oldMember.channel.id]
				const msgchannel = oldMember.channel.guild.channels.cache.find(ch => ch.id === sendingchannelid);
				if (oldMember.channel.members.size > 0){
					msgchannel.send("The user who was practicing has left or does not want to practice anymore. The first person to say '!practice' will be able to practice. Room Name: " + oldMember.channel.name) 
				}
				whospracticing[oldMember.channel.id] = null
			}
			console.log("new user joined")
			console.log(newMember.channel.id)
			if (APPLIED_CHANNELS.includes(newMember.channel.id) == false) {
				newMember.member.voice.setMute(false, "unmute because he/she is in a channel which the bot doesn't manage. ")
				console.log(newUserChannel.member.id + " unmute because he/she is in a channel which the bot doesn't manage. ")
			} else {
			//MANAGE THIS USER
				if (newUserChannel.channel.members.size == 1 & APPLIED_CHANNELS.includes(newMember.channel.id)) {
					if (whospracticing[newMember.channel.id] == "upforgrabs"){
						newMember.member.voice.setMute(false, "unmute because the channel is up for grabs. (no one is practicing)")
						console.log(newUserChannel.member.id + " unmute because the channel is up for grabs. (no one is practicing)")
						whospracticing[newMember.channel.id] = newUserChannel.member.id;
						whospracticing[newMember.channel.id+"piece"] = null
					} else {
						newMember.member.voice.setMute(false, "unmute because the channel is up for grabs. (no one is practicing)")
						whospracticing[newMember.channel.id] = newMember.member.id;
						console.log(whospracticing)
						console.log(newUserChannel.member.id + " unmute because he/she is the only user in the channel.")
						whospracticing[newMember.channel.id+"piece"] = null
					}
				} else {
					//member is listening
					newMember.member.voice.setMute(true, "auto mute")
					console.log(newUserChannel.member.id + " mute because he/she is listening channel size: " + newUserChannel.channel.members.size + "==" + newUserChannel.channel.id)
				}
			}
		} else {
			console.log("unnecessary update avoided yay!")
		}
	}
	if (newUserChannel.channel == null & oldUserChannel.channel != null) {
		//hey! user has left.
		//that's when we pick a new member to practice. //
		//channel.sendmessage(hey who wants to practice
		if (oldMember.member.id == whospracticing[oldMember.channel.id]){
			whospracticing[oldMember.channel.id] = "upforgrabs"
			sendingchannelid = BROADCAST_CHANNELS[oldMember.channel.id]
			const msgchannel = oldMember.channel.guild.channels.cache.find(ch => ch.id === sendingchannelid);
			if (oldMember.channel.members.size > 0){
				msgchannel.send("The user who was practicing has left or does not want to practice anymore. The first person to say '!practice' will be able to practice. Room Name: " + oldMember.channel.name) 
			}
			whospracticing[oldMember.channel.id] = null
		}
	}
})
//UPDATE YOUR TOKEN HERE. 
client.login('NTU3Mjk1MjUxNzA3MTMzOTYy.Xnlk_w.nNrLLgCyJZ9zzBj2vCBrjMb_PR0');
