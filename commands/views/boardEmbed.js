const { secondsToHoursAndMinutes } = require('../../helpers/TimeCalc')
const Discord = require('discord.js');
const table = require('table');
const { getNick } = require('../../helpers/getNick')

function boardEmbed(msg, data) {

    const Client  = new Discord.Client();

    let possiblePracticed = [['User','Total Practice Time']]
    for (i = 0; i < data.length; i++){
        var totalPracTime = secondsToHoursAndMinutes(data[i].info['practiceStats']['totalTime'])
        var totalPracTime = totalPracTime[1] + "h " + totalPracTime[0] + "m"
        possiblePracticed.push([getNick(msg.guild.members.cache.find(m => m.id === data[i].userId)), totalPracTime])
    }
    console.log(possiblePracticed)
    const embed = new Discord.MessageEmbed()
        .setColor(0xF99806)
        .setTitle('Practice Leaderboard')
        .addField('Leaderboard', `\`\`\`${table.table(possiblePracticed)}\`\`\``)

    msg.channel.send(embed)
}

module.exports = {
    boardEmbed
}