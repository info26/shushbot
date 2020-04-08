//custom discord bot for managing server unmutes and mutes. 


const Discord = require('discord.js');
const filesystem = require('fs');
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

BUILD_PROFILE = "DEV";
APPLIED_CHANNELS = [];
BROADCAST_CHANNELS = {};
BOT_TOKEN = '';

//production grade: initialized with channels on live server
if (BUILD_PROFILE == "PROD") {
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

    /*var temp = '';
    filesystem.readFile('./../prodToken.txt', 'utf-8', (err, data) => {
        if(err) throw err;
        console.log(data);
        temp = data;
    })
    BOT_TOKEN = temp;*/

    BOT_TOKEN = 'NjkyMTg3OTcyMTQwOTI0OTY5.XoO39A.cdL-nTJJ6oTWeJuqBHZcIeEmi5c';
}
//development/quality assurance grade: initialized with channels on test server
else if (BUILD_PROFILE == "DEV") {
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

    /*var temp = '';
    filesystem.readFile('./../devToken.txt',  'utf8', (err, data) => {
        if(err) throw err;
        console.log(data);
        temp = data;    
        console.log(temp);  
    })
    BOT_TOKEN = temp;
    console.log(BOT_TOKEN)*/
    BOT_TOKEN = 'NjkxODIyNzIwMjkxMTc2NDU4.XoO3zw.YpDpbeh4tzqhtF3cNVLVtlGRo3M';


} else {
    console.log("unknown build profile, please use DEV or PROD")
}

BOT_PREFIX = "$";

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

//UPDATE YOUR TOKEN HERE. 
client.login(BOT_TOKEN);
