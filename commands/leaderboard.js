var mongofuncs = require('./../cloud/mongofuncs.js');
var mongoConnect = require('./../cloud/mongoConnect');
const { boardEmbed } = require('./views/boardEmbed');

function leaderboard(msg){
    mongoConnect.connectToShushDB(function(err, client){
        if(err){
            console.log(err);
        }
        else{
            mongofuncs.leaderboard()
                .then(data => {
                    boardEmbed(msg, data)
                })
                .catch(err => {
                    console.log(err);
                })
        }
    });
}


module.exports = {
    leaderboard
}