//custom discord bot for managing server unmutes and mutes. 
const Discord = require('discord.js');
const filesystem = require('fs');
require('dotenv-flow').config();


client = new Discord.Client();
//for commands. 
client.commands = new Discord.Collection();
//register events. 
require('./events');
//done! waaaw11!
filesystem.readFile('./store', (err, data) => {
    whospracticing = JSON.parse(data);
});
//Paste in IDs of your voice channels that you want the bot to manage. 
//Make sure that it is a string. 
//DEBUG MODE enabled the !dump cmd. it prints the whospracticing variable to console. 
DEBUG_ENABLED = true;
//specified which channel(s) the bot manages. 

APPLIED_CHANNELS = [];
BROADCAST_CHANNELS = {};

//production grade: initialized with channels on live server
if (process.env.build_profile == "PROD") {
    APPLIED_CHANNELS = [
        "691237976923176990",
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
        "691763054253178890",

    ];

    //VOICECHANNEL : TEXT CHANNEL
    BROADCAST_CHANNELS = {
        "691237976923176990": "691811634666012793",
        "690498106046939166": "691194463250546709",
        "691174956389892116": "691194463250546709",
        "691176415424675872": "691194463250546709",
        "691176843054678077": "691194463250546709",
        "691364426326081570": "691487021025198090",
        "691364613534777416": "691487021025198090",
        "691365076006993933": "691487021025198090",
        "691365076195606539": "691487021025198090",
        "691482430023925810": "691763754370859069",
        "691482513192779816": "691763754370859069",
        "691762889773547550": "691763754370859069",
        "691763054253178890": "691763754370859069"
    };
}
//development/quality assurance grade: initialized with channels on test server
else if (process.env.build_profile == "DEV") {
    APPLIED_CHANNELS = [
        "691725669326913747",
        "691719071619874816",
        "692002216957051030",
        "692132723921518627"
    ];
    BROADCAST_CHANNELS = {
        "691725669326913747": "691808798817517600",
        "691719071619874816": "691808874910449734",
        "692002216957051030": "691808874910449734"
    };
} else {
    console.log("unknown build profile, please use DEV or PROD");
	console.log("Please check to make sure your .env files are set up correctly. ");
	process.exit(69); // we don't want to continue. 
}

BOT_PREFIX = "$";

//set commands
client.commands = require('./commands')
console.log(client.commands)

whospracticing = {}
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({ activity: { name: '$help for more info' }, status: 'online' })
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
//ctrl c detection
process.on('SIGINT', function() {
    filesystem.writeFile("./store", JSON.stringify(whospracticing), function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("Saved!");
        process.exit(0);
    });

});

client.login(process.env.token)
