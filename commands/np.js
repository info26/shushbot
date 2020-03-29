const Discord = require('discord.js')
const { TimeCalc } = require('./../helpers/TimeCalc')
const { getNick } = require('../helpers/getNick')

function np(msg) {
    if (msg.member.voice.channel == null) {
        msg.reply("(X) You aren't in a voice channel");
    } else {
        voicechid = msg.member.voice.channel.id;
        console.log(whospracticing[voicechid])
        userplaying = whospracticing[voicechid]
        
        if (userplaying == null || userplaying == "upforgrabs") {
            msg.reply("No one is practicing at the moment. ")
            return;
        }
        userobject = msg.member.guild.members.cache.find(mem => mem.id == userplaying);
        piecename = whospracticing[voicechid + "piece"];
        nickname = getNick(userobject)



        result = TimeCalc(voicechid);
        if (piecename == null) {
            msg.reply(nickname + " has played for " + result[1] + " hours and " + result[0] + " minutes")
        } else {
            msg.reply(nickname + " is currently playing " + piecename + " and has played for " + result[1] + " hours and " + result[0] + " minutes")
        }
    }
}

module.exports = {
    np
}
