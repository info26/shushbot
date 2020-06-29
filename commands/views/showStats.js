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

function displayServerStats(data){

    var weeklyReadable = secondsToHoursAndMinutes(data.practiceStats.weeklyTotal);
    var monthlyReadable = secondsToHoursAndMinutes(data.practiceStats.monthlyTotal);
    var yearlyReadable = secondsToHoursAndMinutes(data.practiceStats.yearlyTotal);
    var grandTotalReadable = secondsToHoursAndMinutes(data.practiceStats.grandTotal);

    const serverStatsEmbed = {
        color: "#F99806",
        title: 'Server Practice Time Totals',
        fields: [
            {
                name: "Weekly Total",
                value: weeklyReadable[1] + "h" + weeklyReadable[0] + "m"
            },
            {
                name: "Monthly Total",
                value: monthlyReadable[1] + "h" + monthlyReadable[0] + "m"
            },
            {
                name: "Yearly Total",
                value: yearlyReadable[1] + "h" + yearlyReadable[0] + "m"
            },
            {
                name: "Grand Total",
                value: grandTotalReadable[1] + "h" + grandTotalReadable[0] + "m"
            }
        ],
        timestamp: new Date(),
        thumbnail: {
            "url": "attachment://IMG_1553.jpg",
        }
    };
    msg.channel.send({
        embed: serverStatsEmbed,
        files: [{
            attachment:'../shushbot/resources/IMG_1553.jpg',
            name:'IMG_1553.jpg'
        }],  
    })
        .then(msg => {
            msg.delete({timeout: 20000})
        }),

    module.exports = {
        displayServerStats
    }
}

module.exports = {
    showStats,
    displayServerStats
}