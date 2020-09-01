const Discord = require('discord.js');

function help(msg) {
    // fancy embed VVVVV
    //define fields later using a function that appends to a list ig uess
    const helpEmbed = {
        color: "#F99806",
        title: 'Shushbot help page',
        description: "Documentation available [here](https://shush-bot.firebaseapp.com/) \n Report bugs [here](https://forms.gle/A4mA6AYJQFdDm62N9) \n Click [here](https://discordapp.com/channels/690354771189825547/705344913319133184/705354040778948669) for optimal Discord audio settings", 
        fields: [
            {
                name: BOT_PREFIX + "practice",
                value: "If your channel has no one practicing, use $practice to start practicing. The bot will announce when it is looking for people to practice."
            },
            {
                name: BOT_PREFIX + "nomore",
                value: "If you don't want to practice anymore, you can use the $nomore command to tell the bot that you are done practicing."
            },
            {
                name: BOT_PREFIX + "np",
                value: "This command will make the bot tell you who is practicing."
            },
            {
                name: BOT_PREFIX + "song",
                value: "If you are practicing, this command will set the song you are practicing. Usage: $song <song name>"
            },
            {
                name: BOT_PREFIX + "excuse",
                value: "Unmutes a user so they can talk / give you feedback. Usage: $excuse <user>"
            },
            {
                name: BOT_PREFIX + "unexcuse",
                value: "Mutes a user once they are done giving you feedback. Usage: $unexcuse <user>"
            },
            {
                name: BOT_PREFIX + "stats",
                value: "Gets statistics of a user. Usage: $stats [user]"
            }
            
        ],
        timestamp: new Date(),
        thumbnail: {
            "url": "attachment://IMG_1553.jpg",

        }
    };
    msg.channel.send({
        embed: helpEmbed,
        files: [{
            attachment:'../shushbot/resources/IMG_1553.jpg',
            name:'IMG_1553.jpg'
        }],  
    })
        .then(msg => {
            msg.delete({timeout: 20000})
        }),

    module.exports = {
        help
    }
}

function mod(msg){
    const helpEmbed = {
        color: "#F99806",
        title: 'Shushbot mod commands page',
        description: "Documentation available [here](https://shush-bot.firebaseapp.com/) \n Report bugs [here](https://forms.gle/A4mA6AYJQFdDm62N9) \n Click [here](https://discordapp.com/channels/690354771189825547/705344913319133184/705354040778948669) for optimal Discord audio settings", 
        fields: [
            {
                name: BOT_PREFIX + "forcepractice",
                value: "For case by case scenarios when a mod wants to force someone to practice. "
            },
            {
                name: BOT_PREFIX + "forcestop",
                value: "For case by case scenarios when a mod wants to force someone to stop practice."
            },
            {
                name: BOT_PREFIX + "enablechs",
                value: "To enable new voicechats to the bot, or update existing voice chats with a new text chat. Usage: $enablechs vcId1, vcId2, ..., vcIdn, txtChId (Assigns vcId1 - vcIdn to txtChId)."
            },
            {
                name: BOT_PREFIX + "disablechs",
                value: "To disable existing voicechats from the bot. Usage: $disablechs vcId1, vcId2, ..., vcIdn"
            },
            {
                name: BOT_PREFIX + "serverStats",
                value: "Gets the server total statistics, accumulation of everyone's practice time for certain time intervals. Usage: $serverStats"
            },
            {
                name: BOT_PREFIX + "leaderboard",
                value: "Get the overall leaderboard of individual practice times. Use with great caution, do not use it in public channels. Usage: $leaderboard"
            }
            
        ],
        timestamp: new Date(),
        thumbnail: {
            "url": "attachment://IMG_1553.jpg",

        }
    };
    msg.channel.send({
        embed: helpEmbed,
        files: [{
            attachment:'../shushbot/resources/IMG_1553.jpg',
            name:'IMG_1553.jpg'
        }],  
    })
        .then(msg => {
            msg.delete({timeout: 20000})
        }),

    module.exports = {
        mod
    }
}

function modcommands(msg){
    if (msg.member.permissions.has(['MANAGE_GUILD'])){
        mod(msg)
    }
    else{
        msg.reply("You do not have the permissions to see the mod commands");
    }
}

module.exports = {
    help,
    modcommands
}