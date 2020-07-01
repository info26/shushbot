var mongofuncs = require('./../cloud/mongofuncs.js');
var mongoConnect = require('./../cloud/mongoConnect');

function leaderboard(){
    mongoConnect.connectToShushDB(function(err, client){
        if(err){
            console.log(err);
        }
        else{
            mongofuncs.leaderboard()
                .then(data => {
                    console.log(data)
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