const { get } = require('./../cloud/dbutils');

function getStats(msg){
    var cmd = msg.content.split(" ");
    //if user is looking for their own stats
    if(cmd.length < 2){
        get(msg.author.id).then(function(data){
            console.log("RES: " + JSON.stringify(data, null, 2));
            //console.log(data.Item.info.practiceStats.totalTime);
    
            showStats(data.Item);
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
        
                showStats(data.Item);
            }); 
        }
        //normal users cannot see others' stats
        else {
            msg.reply("(X) You do not have the permissions to see other users' stats");
        }
    }

}

function showStats(obj){

}

module.exports = {
    getStats
}