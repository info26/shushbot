const Discord = require('discord.js');

function help(msg) {
    // fancy embed VVVVV
    //define fields later using a function that appends to a list ig uess
    const helpEmbed = {
        color: "#F99806",
        title: 'Shushbot help page',
        description: "Documentation available [here](https://shush-bot.firebaseapp.com/). Report bugs [here](https://forms.gle/A4mA6AYJQFdDm62N9)",
        fields: [{ //kay im gonna start copying the stuff from the website. 
                name: "practice",
                value: "If your channel has no one practicing, use $practice to start practicing. The bot will announce when it is looking for people to practice."
            },
            {
                name: "nomore",
                value: "If you don't want to practice anymore, you can use the $nomore command to tell the bot that you are done practicing."
            },
            {
                name: "forcepractice",
                value: "This command is mod only. "
            },
            {
                name: "forcestop",
                value: "This command is mod only. "
            },
            {
                name: "np",
                value: "This command will make the bot tell you who is practicing."
            },
            {
                name: "song",
                value: "If you are practicing, this command will set the song you are practicing. Usage: $song <song name>"
            },
            {
                name: "excuse",
                value: "Unmutes a user so they can talk / give you feedback. Usage: $excuse <user>"
            },
            {
                name: "unexcuse",
                value: "Mutes a user once they are done giving you feedback. Usage: $unexcuse <user>"
            }
        ],
        timestamp: new Date(),
        thumbnail: {
            "url": "attachments://Shush.jpg",

        }
    };
    msg.channel.send({
        embed: helpEmbed,
        files: [{
            attachment: './../resources/IMG_1553.jpg',
            name: 'Shush.jpg'
        }]
    });

    module.exports = {
        help
    }
}

module.exports = {
    help
}