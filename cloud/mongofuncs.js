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
    };
    return userRecord;
}

function updateUser(userid, practicedTime, lastRep) {
    if(practicedTime != null){
        return new Promise(function(resolve, reject){
            var query = { userId: userid }
            updatedvals = { $set: {"info.practiceStats.lastRep": lastRep, "info.practiceStats.lastRepTime": practicedTime}, $inc: {"info.practiceStats.totalTime": practicedTime}};
            db.collection(process.env.userStatsCollection).updateOne(query, updatedvals, {upsert: true}, function(err, res){
                if (err) {
                    reject(err);
                } else {
                    console.log("Updated");
                    resolve();
                }
            });
        });
    }
}

function getUserInDb(userid) {
    return new Promise(function(resolve, reject) {
        db.collection(process.env.userStatsCollection).findOne({
            userId: userid
        }, function(err, result) {
            if(err){
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

//you dont' need this function, it can be handled in the getUserInDb()
/*function userInDb(userid) {
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
}*/

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

//one-time use function
function addServerRecord() {
    return new Promise(function(resolve, reject) {
        var serverDoc = {
            "identifier": "serverStats",
            "practiceStats": {
                "dailyTotal": 0,
                "weeklyTotal" : 0,
                "monthlyTotal": 0,
                "yearlyTotal": 0,
                "grandTotal": 0
            }
        }
        db.collection(process.env.serverStatsCollection).insertOne(serverDoc, function(err, res){
            if(err){
                console.log(err);
                reject(err);
            } else {
                console.log("Created record for serverStats");
                resolve();
            }
        });
    });
}

function getServerRecord() {
    return new Promise(function(resolve, reject) {
        db.collection(process.env.serverStatsCollection).findOne({
            identifier: "serverStats"
        }, function(err, result) {
            if(err){
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function updateServerRecord(additionalTime){
    if(additionalTime != null){
        return new Promise(function(resolve, reject){
            var query = { identifier: "serverStats" }
            updatedvals = { $inc: {
                "practiceStats.dailyTotal": additionalTime, 
                "practiceStats.weeklyTotal": additionalTime,
                "practiceStats.monthlyTotal": additionalTime,
                "practiceStats.yearlyTotal": additionalTime,
                "practiceStats.grandTotal": additionalTime,
                }
            };
            db.collection(process.env.serverStatsCollection).updateOne(query, updatedvals, {upsert: true}, function(err, res){
                if (err) {
                    reject(err)
                } else {
                    console.log("Updated serverStats")
                    resolve()
                }
            });
        });
    }
}

function resetServerTimePractice(attribute){
    return new Promise(function(resolve, reject){
        var query = { identifier: "serverStats" };
        let exec = {["practiceStats." + attribute]: 0}
        updatedvals = { $set: exec};
        db.collection(process.env.serverStatsCollection).updateOne(query, updatedvals, function(err, res){
            if (err) {
                reject(err)
            } else {
                console.log("Updated serverStats")
                resolve()
            }
        });
    });
}

function leaderboard(){
    return new Promise(function(resolve, reject){
        db.collection(process.env.userStatsCollection).find().sort({"info.practiceStats.totalTime": -1}).limit(10).toArray(function(err, docs){
            if(err){
                reject(err);
            }
            else{
                resolve(docs);
            }
        });
    });
}

module.exports = {
    insNewUser,
    //userInDb,
    getUserInDb,
    updateUser,
    getServerRecord,
    addServerRecord,
    updateServerRecord,
    resetServerTimePractice,
    leaderboard
}
