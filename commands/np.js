const Discord = require('discord.js')
const { TimeCalc } = require('./../helpers/TimeCalc')

function np(msg) {
    if (msg.member.voice.channel == null) {
        msg.reply("(X) You aren't in a voice channel");
    } else {
        voicechid = msg.member.voice.channel.id;
        userplaying = whospracticing[voicechid]
        if (userplaying == null || userplaying == "upforgrabs") {
            msg.reply("No one is practicing at the moment. ")
            return;
        }
        userobject = msg.member.guild.members.cache.find(mem => mem.id == userplaying);
        piecename = whospracticing[voicechid + "piece"];



        result = TimeCalc(voicechid);
        if (piecename == null) {
            msg.reply(userobject.user.username + " is currently playing " + " for " + result[0] + ":" + result[1] + ".")
        } else {
            msg.reply(userobject.user.username + " is currently playing" + piecename + " for " + result[1] + ":" + result[0] + ".")
        }
    }
}

module.exports = {
    np
}