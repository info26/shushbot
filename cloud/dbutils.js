var AWS = require("aws-sdk");
require('dotenv-flow').config();


AWS.config.update ({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: process.env.region
});

var docClient = new AWS.DynamoDB.DocumentClient();

function getUserRecord(userid){
    var queryDoc = {
        TableName: process.env.userStatsTable,
        Key: {
            "userId": userid
        }
        
    }

    var promise = new Promise(function(resolve, reject) {
        console.log("Getting item...");
        docClient.get(queryDoc, function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);          
            }
        })
    });
    
    return promise;
}

function updateUserRecord(userid, additionalTime, lastRepretoire) {
    var insertDoc = {
        TableName: process.env.userStatsTable,
        Item: {
            "userId": userid,
            "info": {
                "practiceStats" : {
                    "totalTime" : additionalTime,
                    "lastRep": lastRepretoire,
                    "lastRepTime": additionalTime
                }
            }
        },
        ConditionExpression: "attribute_not_exists(id)"
    };

    var updateDoc = {
        TableName: process.env.userStatsTable,
        Key: {
            "userId": userid
        },
        UpdateExpression: "set info.practiceStats.totalTime = info.practiceStats.totalTime + :val, info.practiceStats.lastRep = :lastRep, info.practiceStats.lastRepTime = :val",
        ExpressionAttributeValues: {
            ":val": additionalTime,
            ":lastRep": lastRepretoire
        }
    };

    docClient.update(updateDoc, function(err, data){
        if(err){
            console.log("user with that id doesn't exist on record, adding new user");
            docClient.put(insertDoc, function(err, data) {
                if(err){
                    console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("Added new user record: ", JSON.stringify(data, null, 2));
                }
            });
        } else {
            console.log("Update succeeded for user: " + userid + "record: ", JSON.stringify(data, null, 2));
        }
    });
}

//static/one-time use function only - or just not used if already initialized manually beforehand
function addServerRecord(){
    var insertDoc = {
        TableName: process.env.serverStatsTable,
        Item: {
            "id": "serverStats",
            "practiceStats" : {
                "dailyTotal": 0,
                "weeklyTotal" : 0,
                "monthlyTotal": 0,
                "yearlyTotal": 0,
                "grandTotal": 0
            }
        },
        ConditionExpression: "attribute_not_exists(id)"
    };

    console.log("Adding a new item...");
    var insertCallback = function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    };

    docClient.put(insertDoc, insertCallback);
}

function updateServerRecord(additionalTime){
    var updateDoc = {
        TableName: process.env.serverStatsTable,
        Key: {
            "id": "serverStats"
        },
        UpdateExpression: "set practiceStats.dailyTotal = practiceStats.dailyTotal + :val, practiceStats.weeklyTotal = practiceStats.weeklyTotal + :val, practiceStats.monthlyTotal = practiceStats.monthlyTotal + :val, practiceStats.yearlyTotal = practiceStats.yearlyTotal + :val, practiceStats.grandTotal = practiceStats.grandTotal + :val",
        ExpressionAttributeValues: {
            ":val": additionalTime
        }
    };

    docClient.update(updateDoc, function(err, data) {
        if(err){
            console.error("Unable to update server record. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Update succeeded for server: ", JSON.stringify(data, null, 2));
        }
    });
}

function getServerRecord(){
    var queryDoc = {
        TableName: process.env.serverStatsTable,
        Key: {
            "id": "serverStats"
        }   
    }

    var promise = new Promise(function(resolve, reject) {
        console.log("Getting item...");
        docClient.get(queryDoc, function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);          
            }
        })
    });
    
    return promise;
}

module.exports= {
    getUserRecord,
    updateUserRecord,
    updateServerRecord,
    getServerRecord
}
