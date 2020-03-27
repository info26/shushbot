//custom discord bot for managing server unmutes and mutes. 


const Discord = require('discord.js');
client = new Discord.Client();
client.commands = new Discord.Collection();
console.log("Starting bot ...");
//register events. 
console.log("Registering events ...");
require('./events');
//done! waaaw11!

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


//helper function. Thanks Stack Overflow!
Array.prototype.remove = function() {
    var what, a = arguments,
        L = a.length,
        ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
//END HELPER FUNCTION.


//UPDATE YOUR TOKEN HERE. 
client.login('NTU3Mjk1MjUxNzA3MTMzOTYy.Xnlk_w.nNrLLgCyJZ9zzBj2vCBrjMb_PR0');