var mongofuncs = require('./../cloud/mongofuncs');
var mongoConnect = require('./../cloud/mongoConnect');
const displayStats = require('./views/showStats');

function stats(msg){
    var cmd = msg.content.split(" "); 
    mongoConnect.connectToShushDB(function(err, client){
        if(err) {
            console.log(err);
        }
        else if (cmd.length < 2) {
            mongofuncs.getUserInDb(msg.author.id)
                .then(data => {
                    if(data == null){
                        msg.reply("Your record doesn't exist yet, go to a practice room and practice for a bit first!");
                    }
                    else {
                        displayStats.showStats(msg, data, msg.author);
                    }
                    
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else {
            mongofuncs.getUserInDb(msg.mentions.users.first().id)
                .then(data => {
                    if(data == null){
                        msg.reply("This user's record doesn't exist yet!");
                    } else {
                        displayStats.showStats(msg, data, msg.mentions.users.first());
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    });
}

function serverstats(msg){
    if (msg.member.permissions.has(['MANAGE_GUILD'])){
        mongoConnect.connectToShushDB(function(err, client){
            if(err){
                console.log(err);
            }
            else{
                mongofuncs.getServerRecord()
                    .then(data => {
                        displayStats.displayServerStats(msg, data);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        });
    } else {
        msg.reply("You do not have the permissions to see total server stats");
    }
}

/*
function stats(msg){
    var cmd = msg.content.split(" ");
    //if user is looking for their own stats
    if(cmd.length < 2){
        getUserRecord(msg.author.id)
            .then(function(data){
                console.log("RES: " + JSON.stringify(data, null, 2));
                displayStats.showStats(msg, data.Item, msg.author);
            })
            .catch(function(err){
                msg.reply("Your record doesn't exist yet, go to a practice room and practice for a bit first!");
            }); 
        }

    //if a user is looking for other people's stats
    else{
        //only a moderator can look at other people's stats
        if (msg.member.permissions.has(['MANAGE_GUILD'])){
            //get first mention in the message and get their stats
            getUserRecord(msg.mentions.users.first().id)
                .then(function(data){
                    console.log("RES: " + JSON.stringify(data, null, 2));
                    displayStats.showStats(msg, data.Item, msg.mentions.users.first());
                })
                .catch(function(err) {
                    msg.reply("This individual's record doesn't exist yet")
                }); 
        }
        //normal users cannot see others' stats
        else {
            msg.reply("You do not have the permissions to see other users' stats");
        }
    }

}

function serverStats(msg){
    if (msg.member.permissions.has(['MANAGE_GUILD'])){
        getServerRecord()
            .then(function(data){
                console.log("RES: " + JSON.stringify(data, null, 2));
                displayStats.displayServerStats(msg, data.Item);
            })
            .catch(function(err){
                console.log("this really shouldn't be happening and it means you broke something so badly that it went into this clause")
            });
    }
    else {
        msg.reply("You do not have the permissions to see total server stats");
    }
}
*/



module.exports = {
    stats,
    serverstats
}