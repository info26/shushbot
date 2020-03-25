const Discord = require('discord.js')

function song(msg) {
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

module.exports = {
    song
}