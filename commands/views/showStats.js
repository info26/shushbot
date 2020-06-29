const { secondsToHoursAndMinutes } = require('../../helpers/TimeCalc')

function showStats(msg, obj, user){
    var total = obj.info.practiceStats.totalTime;
    var lastTime = obj.info.practiceStats.lastRepTime;
    var lastRep = obj.info.practiceStats.lastRep;

    if(lastRep == null){
        lastRep = "undefined"
    }

    var totalReadable = secondsToHoursAndMinutes(total);
    var lastTimeReadable = secondsToHoursAndMinutes(lastTime);

    const userStatsEmbed = {
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
        embed: userStatsEmbed
    })
        .then(msg => {
            msg.delete({timeout: 20000})
        });

    module.exports = {
        showStats
    }
}

function showServerstats(data){

}

module.exports = {
    showStats,
    showServerstats
}