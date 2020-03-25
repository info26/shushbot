//custom discord bot for managing server unmutes and mutes. 


const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

//Paste in IDs of your voice channels that you want the bot to manage. 
//Make sure that it is a string. 
whospracticing = {}
APPLIED_CHANNELS = [
    "691725669326913747",
    "691719071619874816",
    "692002216957051030"
];
BROADCAST_CHANNELS = {
    "691725669326913747": "691808798817517600",
    "691719071619874816": "691808874910449734",
    "692002216957051030": "691808874910449734"
};
BOT_PREFIX = "!";

//set commands
client.commands = require('./commands')
console.log(client.commands)

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.on('message', async msg => {
    if (msg.content.startsWith(BOT_PREFIX)) {
        //fix for cmds with args. 
        cmd = msg.content.split(" ")

        console.log(cmd[0].replace(BOT_PREFIX, ""))
        if (client.commands[cmd[0].replace(BOT_PREFIX, "")] == null) {
            //this cmd does not exist. send no reply
            return;
        }
        client.commands[cmd[0].replace(BOT_PREFIX, "")](msg)
    }

});
client.on('voiceStateUpdate', async(oldMember, newMember) => {
        let newUserChannel = newMember;
        let oldUserChannel = oldMember;
        if ((newUserChannel.channel != null & oldUserChannel.channel == null)) {
            console.log("new user joined")
            console.log(newMember.channel.id)
            if (APPLIED_CHANNELS.includes(newMember.channel.id) == false) {
                newMember.member.voice.setMute(false, "unmute because he/she is in a channel which the bot doesn't manage. ")
                console.log(newUserChannel.member.id + " unmute because he/she is in a channel which the bot doesn't manage. ")
            } else {
                //MANAGE THIS USER
                if (newUserChannel.channel.members.size == 1 & APPLIED_CHANNELS.includes(newMember.channel.id)) {
                    if (whospracticing[newMember.channel.id] == "upforgrabs") {
                        newMember.member.voice.setMute(false, "unmute because the channel is up for grabs. (no one is practicing)")
                        console.log(newUserChannel.member.id + " unmute because the channel is up for grabs. (no one is practicing)")
                        whospracticing[newMember.channel.id] = newUserChannel.member.id;
                        whospracticing[newMember.channel.id + "piece"] = null
                    } else {
                        newMember.member.voice.setMute(false, "unmute because he/she is the only user in the channel.")
                        whospracticing[newMember.channel.id] = newMember.member.id;
                        console.log(whospracticing)
                        console.log(newUserChannel.member.id + " unmute because he/she is the only user in the channel.")
                        whospracticing[newMember.channel.id + "piece"] = null
                    }

                } else {
                    //member is listening
                    newMember.member.voice.setMute(true, "mute because he/she is listening")
                    console.log(newUserChannel.member.id + " mute because he/she is listening channel size: " + newUserChannel.channel.members.size + "==" + newUserChannel.channel.id)
                }
            }
        }
        if ((newUserChannel.channel != null & oldUserChannel.channel != null)) {
            // user has switched channels // or unrelated update. 
            if (newMember.channel.id != oldMember.channel.id) {
                //for if this user WAS practicing. 
                if (whospracticing[oldMember.channel.id] != null & oldMember.member.id == whospracticing[oldMember.channel.id]) {
                    whospracticing[oldMember.channel.id] = "upforgrabs"
                    sendingchannelid = BROADCAST_CHANNELS[oldMember.channel.id]
                    const msgchannel = oldMember.channel.guild.channels.cache.find(ch => ch.id === sendingchannelid);
                    if (oldMember.channel.members.size > 0) {
                        msgchannel.send("The user who was practicing has left or does not want to practice anymore. The first person to say '!practice' will be able to practice. Room Name: " + oldMember.channel.name)
                    }
                    whospracticing[oldMember.channel.id] = null
                }
                console.log("new user joined")
                console.log(newMember.channel.id)
                if (APPLIED_CHANNELS.includes(newMember.channel.id) == false) {
                    newMember.member.voice.setMute(false, "unmute because he/she is in a channel which the bot doesn't manage. ")
                    console.log(newUserChannel.member.id + " unmute because he/she is in a channel which the bot doesn't manage. ")
                } else {
                    //MANAGE THIS USER
                    if (newUserChannel.channel.members.size == 1 & APPLIED_CHANNELS.includes(newMember.channel.id)) {
                        if (whospracticing[newMember.channel.id] == "upforgrabs") {
                            newMember.member.voice.setMute(false, "unmute because the channel is up for grabs. (no one is practicing)")
                            console.log(newUserChannel.member.id + " unmute because the channel is up for grabs. (no one is practicing)")
                            whospracticing[newMember.channel.id] = newUserChannel.member.id;
                            whospracticing[newMember.channel.id + "piece"] = null
                        } else {
                            newMember.member.voice.setMute(false, "unmute because the channel is up for grabs. (no one is practicing)")
                            whospracticing[newMember.channel.id] = newMember.member.id;
                            console.log(whospracticing)
                            console.log(newUserChannel.member.id + " unmute because he/she is the only user in the channel.")
                            whospracticing[newMember.channel.id + "piece"] = null
                        }
                    } else {
                        //member is listening
                        newMember.member.voice.setMute(true, "auto mute")
                        console.log(newUserChannel.member.id + " mute because he/she is listening channel size: " + newUserChannel.channel.members.size + "==" + newUserChannel.channel.id)
                    }
                }
            } else {
                console.log("unnecessary update avoided yay!")
            }
        }
        if (newUserChannel.channel == null & oldUserChannel.channel != null) {
            //hey! user has left.
            //that's when we pick a new member to practice. //
            //channel.sendmessage(hey who wants to practice
            if (oldMember.member.id == whospracticing[oldMember.channel.id]) {
                whospracticing[oldMember.channel.id] = "upforgrabs"
                sendingchannelid = BROADCAST_CHANNELS[oldMember.channel.id]
                const msgchannel = oldMember.channel.guild.channels.cache.find(ch => ch.id === sendingchannelid);
                if (oldMember.channel.members.size > 0) {
                    msgchannel.send("The user who was practicing has left or does not want to practice anymore. The first person to say '!practice' will be able to practice. Room Name: " + oldMember.channel.name)
                }
                whospracticing[oldMember.channel.id] = null
            }
        }
    })
    //UPDATE YOUR TOKEN HERE. 
client.login('NTU3Mjk1MjUxNzA3MTMzOTYy.Xnlk_w.nNrLLgCyJZ9zzBj2vCBrjMb_PR0');