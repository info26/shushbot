var AWS = require("aws-sdk");

AWS.config.loadFromPath('./config.json');

var docClient = new AWS.DynamoDB.DocumentClient();

function insert(userid, table, time){
    var insertDoc = {
        TableName: table,
        Item: {
            "id": userid,
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

    return docClient.put(insertDoc, insertCallBack);
}

function get(userid, table){
    var queryDoc = {
        TableName: table,
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

    return docClient.get(queryDoc, getCallBack);
}

function update(userid, table, additionalTime){
    var updateDoc = {
        TableName: table,
        Key: {
            "id": userid
        },
        UpdateExpression: "set info.timePracticed = info,timePracticed + :val",
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

    return docClient.put(updateDoc, updateCallBack);
}

module.exports= {
    insert,
    get,
    update
}
