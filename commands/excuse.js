const Discord = require('discord.js')

function excuse(msg){ 
	if (msg.member.voice.channel == null) {
		msg.reply("(X) You aren't in a voice channel");
	} else if (msg.member.id != whospracticing[msg.member.voice.channel.id]){
		msg.reply("(X) You aren't the one practicing")
	}else{
		cmd = msg.content.split(" ")
		console.log(cmd)
		nextcmd = []
		excusedusers = []
		for (i = 1; i < cmd.length; i++){
			nextcmd[i - 1] = cmd[i].match(/(\d+)/)[0]
			/*
			catch(err){
				msg.reply("(X) " + cmd[i] + " is an invalid user")
				continue;
			}
			*/
			console.log(nextcmd[i - 1])
			const userref = msg.member.guild.members.cache.find(mem => mem.id === nextcmd[i - 1]);
			console.log(userref)
			if(userref.voice.channel == null){
				msg.reply("(X) " + userref.user.username + " is not in a voice channel")
			}else if(userref.voice.channel.id != msg.member.voice.channel.id) {
				msg.reply("(X) You can't excuse a member of another voice channel! Naughty.")
			}else {
				excusedusers[i - 1] = userref.user.id
			}
		}
		whospracticing[msg.member.voice.channel.id + "excusedusers"] = excusedusers.join(", ") //should store userids of excused users
		console.log(whospracticing[msg.member.voice.channel.id + "excusedusers"])
		unmute = whospracticing[msg.member.voice.channel.id + "excusedusers"].split(", ")
		for (i = 0; i < unmute.length; i++){
			const unmuteduser = msg.member.guild.members.cache.find(mem => mem.id === unmute[i]);
			unmuteduser.voice.setMute(false, "operation performed by practicer")	
			msg.reply(unmuteduser.user.username + " has been excused and unmuted")
		}
	}
}
	
module.exports = {
    excuse
}