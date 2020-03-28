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
        cmd[1] = match[0]
        console.log(cmd)
        const usermentioned = msg.member.guild.members.cache.find(mem => mem.id === cmd[1]);

        modvoicech = msg.member.voice.channel;
        if (usermentioned == null) {
            msg.reply("(X) Invalid user. ")
        } else if (modvoicech.id != usermentioned.voice.channel.id) {
            //HEY! these users are in different channels. 
            msg.reply("(X) The user that you referred to is in a different channel. ")
        } else {
            usermentionedch = usermentioned.voice;
            if (usermentionedch.channel == null && whospracticing[modvoicech.id] != "upforgrabs") {
                msg.reply("(X) The user you mentioned isn't in a voice channel")
            } else if (whospracticing[modvoicech.id] == "upforgrabs" || whospracticing[modvoicech.id] == null) {
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
                //ok we need to update who is unmuted. aka excused people. 
                if (typeof whospracticing[modvoicech.id + "excused"] !== 'undefined') {
                    dat = whospracticing[modvoicech.id + "excused"]
                    guild = msg.member.guild;
                    dat.forEach(memid => {
                        const user = guild.members.cache.find(mem => mem.id === memid);
                        //don't mute the user who is practicing. 
                        if (user.voice.channel != null && usermentionedch.member.id != user.id) {
                            //user still in vc
                            user.voice.setMute(true, "was excused, but the person practicing quit. ")
                        }
                    })
                }

            }
        }
    } else {
        msg.reply("(X) You do not have permission. ")
    }
}

module.exports = {
    forcepractice
}
