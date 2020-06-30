const { getDb, connectToShushDB } = require('./mongoConnect');
var mongoConnect = require('./mongoConnect');

function prepRecord(userId){
    var userRecord = {
        "userId": userId,
        "info": {
            "practiceStats": {
                "lastRep": "",
                "lastRepTime": 0,
                "totalTime": 0
            }
        }
    }
    return userRecord;
}

function updateUser(userid, practicedTime, lastRep) {
    return new Promise(function(resolve, reject){
        var query = { userId: userid }
        updatedvals = { $set: {"info.practiceStats.lastRep": lastRep, "info.practiceStats.lastRepTime": practicedTime}, $inc: {"info.practiceStats.totalTime": practicedTime}};
        db.collection(process.env.userStatsCollection).updateOne(query, updatedvals, {upsert: true},function(err, res){
            if (err) {
                reject(err)
            } else {
                console.log("Updated")
                resolve()
            }
        })
    })
}

function getUserInDb(userid) {
    return new Promise(function(resolve, reject) {
        db.collection(process.env.userStatsCollection).find({
            userId: userid
        }).toArray(function(err, docs) {
            if (err) {
                reject(err);
            }
            resolve(docs[0]) // remember, this expects you to check if the user is in the db. 
        })
    })
}


function userInDb(userid) {
    var promise = new Promise(function(resolve, reject) {
        db.collection(process.env.userStatsCollection).find({
            userId: userid
        }).toArray(function(err, docs) {
            if (err) {
                reject(err);
            }
            if (docs.length == 0) {
                resolve(false) // not in db
            } else if (docs.length > 1) {
                console.log("WHOA!!!!!!!! More than 1 record in db for user " + userid);
                reject("too many records");
            } else if (docs.length == 1) {
                resolve(true);
            }
            reject("How did you get here? ");
        })
    })
    return promise;
}

function insNewUser(userid){
    return new Promise(function(resolve, reject) {
        db.collection(process.env.userStatsCollection).insertOne(prepRecord(userid), function(err, res){
            if(err){
                console.log(err);
                reject(err);
            } else {
                console.log("Created record for " + userid);
                resolve(userid);
            }
        });
    });
}



module.exports = {
    insNewUser,
    userInDb,
    getUserInDb,
    updateUser
}
