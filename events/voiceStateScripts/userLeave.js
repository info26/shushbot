function userLeave(newMember, oldMember) {
    //hey! user has left.
    //that's when we pick a new member to practice. //
    //channel.sendmessage(hey who wants to practice
    if (oldMember.member.id == whospracticing[oldMember.channel.id]) {
		sendingchannelid = BROADCAST_CHANNELS[oldMember.channel.id]
        const msgchannel = oldMember.channel.guild.channels.cache.find(ch => ch.id === sendingchannelid);
		//if user WAS practicing
		if (whospracticing[oldMember.channel.id] != null & oldMember.member.id == whospracticing[oldMember.channel.id]) {
			if (whospracticing[oldMember.channel.id + "excusedusers"] != undefined){
				excused_users = whospracticing[oldMember.channel.id + "excusedusers"].split(", ")
				console.log(excused_users)
				for(i = 0; i < excused_users.length; i++){	
					const muteduser = oldMember.guild.members.cache.find(mem => mem.id === excused_users[i]);
					console.log(muteduser)
					muteduser.voice.setMute(true, "practicer has left and excused members have been unexcused and muted")
				}
				whospracticing[oldMember.channel.id + "excusedusers"] = "";
				msgchannel.send("The user who was practicing has left so all excused members have been unexcused and muted")
			}
		}
        whospracticing[oldMember.channel.id] = "upforgrabs"
        if (oldMember.channel.members.size > 0) {
            msgchannel.send("The user who was practicing has left or does not want to practice anymore. The first person to say '!practice' will be able to practice. Room Name: " + oldMember.channel.name)
        }
    }
}
module.exports = {
    userLeave
}