const {insNewUser, userInDb, getUserInDb, updateUser} = require('./../cloud/mongofuncs.js');
var mongoConnect = require('./../cloud/mongoConnect');
const displayStats = require('./views/showStats');

/*
mongoConnect.connectToShushDB(function(err, client) {
    if(err){
        console.log(err);
        throw new Error(err);
    } else {
        console.log("server starting?");
        insNewUser("testid").then(data => {
            console.log("User added");
        })
        userInDb("testid").then(data => { 
            console.log(data);
        });
        updateUser("testid", 40, "potato")
        getUserInDb("testid").then(data => {
            console.log(data);
        })
    }
});
*/

function stats(msg){
    var cmd = msg.content.split(" "); 
    if (cmd.length < 2) {

        userInDb(msg.author.id).then(data => {
            if (data == true){
                getUserInDb(msg.author.id).then(data => {
                    displayStats.showStats(msg, data, msg.author);
                });
            } else { 
                msg.reply("Your record doesn't exist yet, go to a practice room and practice for a bit first!");
            }  
        })

    } else {
        userInDb(msg.mentions.users.first()).then(data => {
            if (data == true){
                getUserInDb(msg.mentions.users.first()).then(data => {
                    displayStats.showStats(msg, data, msg.mentions.users.first());
                });
            } else { 
                msg.reply("Your record doesn't exist yet, go to a practice room and practice for a bit first!");
            }  
        })

    }
}

function serverStats(msg){
    if (msg.member.permissions.has(['MANAGE_GUILD'])){
        getServerRecord()
            .then(data => {
                displayStats.displayServerStats(msg, data)
            })
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
    //serverStats
}