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
            "UserId": userid,
            "info": {
                "timePracticed" : time,
            }
        }
    };

    console.log("Adding a new item...");
    var insertCallback = function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    };

    return docClient.putItem(insertDoc, insertCallback);
}

function get(userid){
    var queryDoc = {
        TableName: process.env.table,
        Key: {
            "id": userid
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

    return docClient.getItem(queryDoc, getCallback);
}

function update(userid, additionalTime){
    var updateDoc = {
        TableName: process.env.table,
        Key: {
            "id": userid
        },
        UpdateExpression: "set info.timePracticed = info.timePracticed + :val",
        ExpressionAttributeValues: {
            ":val:": additionalTime
        }
    };

    console.log("Updating the item...");
    var updateCallback = function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        }
    };

    return docClient.updateItem(updateDoc, updateCallback);
}

module.exports= {
    insert,
    get,
    update
}
