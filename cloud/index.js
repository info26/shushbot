var mongoConnect = require('./mongoConnect');
dbFuncs = require('./mongofuncs');

mongoConnect.connectToShushDB(function(err, client) {
    if(err){
        console.log(err);
        throw new Error(err);
    } else {
        console.log("server starting?");
        dbFuncs.getUserInDb("testid").then(data => {
            console.log(data);
        })
    }
});
