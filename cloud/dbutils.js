var AWS = require("aws-sdk");
require('dotenv-flow').config();


AWS.Config ({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: process.env.region
});

var docClient = new AWS.DynamoDB.DocumentClient();

function insert(userid, time){
    var insertDoc = {
        TableName: process.env.table,
        Item: {
            "userId": userid,
            "info": {
                "timePracticed" : {
                    "total" : time,
                    "lastRep": "",
                    "lastRepTime": time
                }
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

function get(userid){
    var queryDoc = {
        TableName: process.env.table,
        Key: {
            "userId": userid
        }
    };

    console.log("getting item...");
    var getCallback = function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
        }
    };

    docClient.get(queryDoc, getCallback);
}

function update(userid, additionalTime, lastRepretoire){
    var createDoc = {
        TableName: process.env.table,
        Key: {
            "userId": userid
        },
        UpdateExpression: "SET info = :obj",
        ExpressionAttributeValues: {
            ":obj":{
                practiceStats: {
                    total: 0,
                    lastRep: "",
                    lastRepTime: 0
                },
            },
        }
    };

    var updateDoc = {
        TableName: process.env.table,
        Key: {
            "id": userid
        },
        UpdateExpression: "set info.practiceStats.total = info.practiceStats.total + :val, info.practiceStats.lastRep = :lastRep, info.practiceStats.lastRepTime = :val",
        ExpressionAttributeValues: {
            ":val": additionalTime,
            ":lastRep": lastRepretoire
        }
    };

    var updateCallback = function(err, data) {
        if (err) {
            if (test.substring('provided expression refers to an attribute')) {
                console.log("Item doesn't exist. Creating item and updating item.");
                docClient.update(createDoc, updateCallback).promise().then(docClient.update(updateDoc, updateCallback));
            } else { 
                console.error("Unable to update item. Error JSON:", JSON.stringify(data, null, 2));
            }
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));   
      }
    };

    docClient.update(updateDoc, updateCallback);
}

module.exports= {
    insert,
    get,
    update
}
