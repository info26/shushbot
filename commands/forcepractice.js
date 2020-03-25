const Discord = require('discord.js')



function forcepractice(msg) {
    //USE msg.content !! msg is not a string. it's a discord.js MESSAGE object. 
    cmd = msg.content.split(" ")
    console.log(cmd)
    if (cmd.length > 2) {
        msg.reply("(X) You have specified too many arguments. ")
    } else if (msg.member.voice.channel == null) {
        msg.reply("(X) You aren't in a voice channel")
    } else if (msg.member.permissions.has(['MANAGE_GUILD'])) {
        match = cmd[1].match(/(\d+)/)
        if (match == null) {
            //null check
            msg.reply("(X) Invalid user. ")
            return;
        }
        cmd[1] = [0]
        console.log(cmd)
        const usermentioned = msg.member.guild.members.cache.find(mem => mem.id === cmd[1]);

        modvoicech = msg.member.voice.channel;
        if (usermentioned == null) {
            msg.reply("(X) Invalid user. ")
        } else {
            usermentionedch = usermentioned.voice;
            if (usermentionedch.channel == null & whospracticing[modvoicech.id] != "upforgrabs") {
                msg.reply("(X) The user you mentioned isn't in a voice channel")
            } else if (whospracticing[modvoicech.id] == "upforgrabs") {
                usermentionedch.setMute(false, "operation performed by moderator")
                    //update whospracticing
                whospracticing[modvoicech.id] = usermentionedch.id
                msg.reply("Done. ")
                whospracticing[modvoicech.id + "piece"] = null;
            } else {
                // all checks completed. 
                usercurpracticing = whospracticing[modvoicech.id]
                const userplaying = msg.member.guild.members.cache.find(mem => mem.id === usercurpracticing);
                // DO IT
                whospracticing[modvoicech.id] = usermentionedch.id
                userplaying.voice.setMute(true, "operation performed by moderator")
                usermentionedch.setMute(false, "operation performed by moderator")
                msg.reply("Done. ")
                whospracticing[modvoicech.id + "piece"] = null;

            }
        }
    } else {
        msg.reply("(X) You do not have permission. ")
    }
}

module.exports = {
    forcepractice
}