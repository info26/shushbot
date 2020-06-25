const { get } = require('./../cloud/dbutils');
const { secondsToHoursAndMinutes } = require('../helpers/TimeCalc')

function stats(msg){
    var cmd = msg.content.split(" ");
    //if user is looking for their own stats
    if(cmd.length < 2){
        get(msg.author.id).then(function(data){
            console.log("RES: " + JSON.stringify(data, null, 2));
            //console.log(data.Item.info.practiceStats.totalTime);
    
            showStats(msg, data.Item, msg.author);
        }); 
    }
    //if a user is looking for other people's stats
    else{
        //only a moderator can look at other people's stats
        if (msg.member.permissions.has(['MANAGE_GUILD'])){
            //get first mention in the message and get their stats
            get(cmd.mentions.users.first().id).then(function(data){
                console.log("RES: " + JSON.stringify(data, null, 2));
                //console.log(data.Item.info.practiceStats.totalTime);
        
                showStats(msg, data.Item, cmd.mentions.users.first());
            }); 
        }
        //normal users cannot see others' stats
        else {
            msg.reply("(X) You do not have the permissions to see other users' stats");
        }
    }

}

function showStats(msg, obj, user){
    var total = obj.info.practiceStats.totalTime;
    var lastTime = obj.info.practiceStats.lastRepTime;
    var lastRep = obj.info.practiceStats.lastRep;

    if(lastRep == null){
        lastRep = "undefined"
    }

    var totalReadable = secondsToHoursAndMinutes(total);
    var lastTimeReadable = secondsToHoursAndMinutes(lastTime);

    const statsEmbed = {
        color: "#F99806",
        fields: [{ 
                name: "Total Practice Time",
                value: "your total time practiced is: " + totalReadable[1] + "h" + totalReadable[0] + "m"
            },
            {
                name: "Last Repretoire",
                value: "The last rep you practiced was: " + lastRep
            },
            {
                name: "Last Repretoire Practice Time",
                value: "You practiced your last rep for: " + lastTimeReadable[1] + "h" + lastTimeReadable[0] + "m"
            },
        ],
        timestamp: new Date(),
        thumbnail: {
            "url": user.displayAvatarURL()
        },
        author: {
            name: user.tag,
            icon_url: user.displayAvatarURL()
        }

    };
    msg.channel.send({
        embed: statsEmbed
    })
        .then(msg => {
            msg.delete({timeout: 20000})
        });

    module.exports = {
        showStats
    }
}

module.exports = {
    stats
}