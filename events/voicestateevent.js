//import more functions. YAY!
const { userJoin, userMove, userLeave } = require("./voiceStateScripts")


const Discord = require('discord.js')

client.on('voiceStateUpdate', async(oldMember, newMember) => {
    if ((newMember.channel != null && oldMember.channel == null)) {
        userJoin(newMember, oldMember)
    }
    if ((newMember.channel != null && oldMember.channel != null)) {
        userMove(newMember, oldMember)
    }
    if (newMember.channel == null && oldMember.channel != null) {
        userLeave(newMember, oldMember)
    }
})