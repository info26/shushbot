//custom discord bot for managing server unmutes and mutes. 


const Discord = require('discord.js');
client = new Discord.Client();
//for commands. 
client.commands = new Discord.Collection();
//register events. 
require('./events');
//done! waaaw11!

//Paste in IDs of your voice channels that you want the bot to manage. 
//Make sure that it is a string. 
//DEBUG MODE enabled the !dump cmd. it prints the whospracticing variable to console. 
DEBUG_ENABLED = true;
//specified which channel(s) the bot manages. 
APPLIED_CHANNELS = [
"690498106046939166",
"691174956389892116",
"691176415424675872",
"691176843054678077",
"691364426326081570",
"691364613534777416",
"691365076006993933",
"691365076195606539",
"691482430023925810",
"691482513192779816",
"691762889773547550",
"691763054253178890
    
];

//VOICECHANNEL : TEXT CHANNEL
BROADCAST_CHANNELS = {
"690498106046939166":"691194463250546709",
"691174956389892116":"691194463250546709",
"691176415424675872":"691194463250546709",
"691176843054678077":"691194463250546709",
"691364426326081570":"691487021025198090",
"691364613534777416":"691487021025198090",
"691365076006993933":"691487021025198090",
"691365076195606539":"691487021025198090",
"691482430023925810":"691763754370859069",
"691482513192779816":"691763754370859069",
"691762889773547550":"691763754370859069",
"691763054253178890":"691763754370859069"
};
BOT_PREFIX = "!";

//set commands
client.commands = require('./commands')
console.log(client.commands)

whospracticing = {}
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
client.login('NjkyMTg3OTcyMTQwOTI0OTY5.Xn61Ww.XTmiL78XU3pkXBO4chhWX6WcJ-A');
