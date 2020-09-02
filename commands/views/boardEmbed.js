const { secondsToHoursAndMinutes } = require('../../helpers/TimeCalc')
const Discord = require('discord.js');
const table = require('table');
const { getNick } = require('../../helpers/getNick')

function boardEmbed(msg, data) {
    
    const Client  = new Discord.Client();

    const embed = new Discord.MessageEmbed()
        .setColor(0xF99806)
        .setTitle('Practice Leaderboard')

    for (i = 0; i < data.length; i++){
        var totalPracTime = secondsToHoursAndMinutes(data[i].info['practiceStats']['totalTime'])
        var totalPracTime = totalPracTime[1] + "h " + totalPracTime[0] + "m"
        if (i == 0){
            embed.addField(`${i + 1}. ${getNick(msg.guild.members.cache.find(m => m.id === data[i].userId))} ♕`, `**Time Practiced**: ${totalPracTime}\n━━━━━━━━━━━━━━`)
        } else {
            embed.addField(`${i + 1}. ${getNick(msg.guild.members.cache.find(m => m.id === data[i].userId))}`, `**Time Practiced**: ${totalPracTime}\n━━━━━━━━━━━━━━`)
        }
        
    }
    
    msg.channel.send(embed).then(msg => {
        msg.delete({timeout: 20000})
    }),

    module.exports = {
        boardEmbed
    }
}

module.exports = {
    boardEmbed
}