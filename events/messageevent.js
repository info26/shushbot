const Discord = require('discord.js')

client.on('message', async msg => {
    //for debug 
    if (msg.content == "!dump" && DEBUG_ENABLED == true) {
        console.log(whospracticing)
    }
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