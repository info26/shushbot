const Discord = require('discord.js')

function unexcuse(msg){//TODO: Add a syntax check
	cmd = msg.content.split(" ")
	if (msg.member.voice.channel == null) {
		msg.reply("(X) You aren't in a voice channel");
		return;
	}
	if (whospracticing[msg.member.voice.channel.id + "excusedusers"] == undefined){
		msg.reply("(X) No one is currently excused")
		console.log(whospracticing[msg.member.voice.channel.id + "excusedusers"])
		return;
	} 
	excused_user_ids = whospracticing[msg.member.voice.channel.id + "excusedusers"].split(", ")
	nextcmd = []
	unexcused_users = []
	for(i = 1; i < cmd.length; i++){
		nextcmd[i - 1] = cmd[i].match(/(\d+)/)[0]
		const refuser = msg.member.guild.members.cache.find(mem => mem.id === nextcmd[i - 1]);
		console.log(refuser)
		if(refuser == null){
			msg.reply("(X) " + cmd[i].replace("@", "") + " is not a valid user")
		}else if (refuser == whospracticing[msg.member.voice.channel.id]){
			msg.reply("(X) You are practicing, make yourself heard! You can't mute yourself.")
		}else{
			unexcused_users[i - 1] = refuser.user.id
		}
	}
	excused_users = whospracticing[msg.member.voice.channel.id + "excusedusers"].split(", ")
	for(i = 0; i < unexcused_users.length; i++){
		const tobemuteduser = msg.member.guild.members.cache.find(mem => mem.id === unexcused_users[i]);
		tobemuteduser.voice.setMute(true, "operation performed by practicer")
	}
	console.log("excused users: " + excused_users)
	console.log("UNexcused users: " + unexcused_users)
	unexcusedusernames = []
	for(i = 0; i < excused_users.length; i++){
		unexcusedusernames[i] = msg.member.guild.members.cache.find(ch => ch.id === unexcused_users[i]);
		unexcusedusernames[i] = unexcusedusernames[i].user.username
	}
	excused_users = excused_users.filter(function(val){
		return !unexcused_users.includes( val );
	});
	whospracticing[msg.member.voice.channel.id + "excusedusers"] = excusedusers.join(", ")
	console.log(unexcusedusernames)
	msg.reply("Done. The following users have been unexcused and muted: " + unexcusedusernames.join(", "))
}

module.exports = {
    unexcuse
}