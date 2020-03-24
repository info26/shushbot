//custom discord bot for managing server unmutes and mutes. 


const Discord = require('discord.js');
const client = new Discord.Client();
whospracticing = {}
//Paste in IDs of your voice channels that you want the bot to manage. 
//Make sure that it is a string. 
APPLIED_CHANNELS = ["691725669326913747", "691719071619874816"]
BROADCAST_CHANNELS = {
	"691725669326913747": "691808798817517600",
	"691719071619874816": "691808874910449734"
}
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});
client.on('message', async msg => {
	if (msg.content === '/practice') {
		console.log(whospracticing)
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
			}
		}
	}
	if (msg.content === '/nomore') {
		if (msg.author.id == whospracticing[msg.member.voice.channel.id]) {
			msg.reply("Ok, you're no longer practicing.")
			msg.member.voice.setMute(true, "user is no longer practicing")
			whospracticing[msg.member.voice.channel.id] = "upforgrabs"
			sendingchannelid = BROADCAST_CHANNELS[msg.member.voice.channel.id]
			const msgchannel = msg.member.guild.channels.cache.find(ch => ch.id === sendingchannelid);
			
			msgchannel.send("The user who was practicing has left or does not want to practice anymore. The first person to say '/practice' will be able to practice") 
		} else {
			msg.reply("(X) You're not the one practicing!")
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
					} else {
						newMember.member.voice.setMute(false, "unmute because he/she is the only user in the channel.")
						whospracticing[newMember.channel.id] = newMember.member.id;
						console.log(whospracticing)
						console.log(newUserChannel.member.id + " unmute because he/she is the only user in the channel.")
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
				const msgchannel = oldMember.member.guild.channels.cache.find(ch => ch.id === '691739049039495239');
				if (oldMember.channel.members.size > 0){
					msgchannel.send("The user who was practicing has left or does not want to practice anymore. The first person to say '/practice' will be able to practice. Room Name: " + oldMember.channel.name) 
				}
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
					} else {
						newMember.member.voice.setMute(false, "unmute because the channel is up for grabs. (no one is practicing)")
						whospracticing[newMember.channel.id] = newMember.member.id;
						console.log(whospracticing)
						console.log(newUserChannel.member.id + " unmute because he/she is the only user in the channel.")
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
			const msgchannel = oldMember.member.guild.channels.cache.find(ch => ch.id === '691739049039495239');
			if (oldMember.channel.members.size > 0){
				msgchannel.send("The user who was practicing has left or does not want to practice anymore. The first person to say '/practice' will be able to practice. Room Name: " + oldMember.channel.name) 
			}
		}
	}
})
//UPDATE YOUR TOKEN HERE. 
client.login('TOKEN');
