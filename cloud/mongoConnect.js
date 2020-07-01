const MongoClient = require('mongodb').MongoClient;

// Use connect method to connect to the Server
function connectToShushDB(callback) {
    // Create a new MongoClient
    const client = new MongoClient(process.env.mongoUri, {useNewUrlParser: true, useUnifiedTopology: true});

    client.connect(function(err, client) {
        global.db = client.db('ShushBot');
        return callback(err);
    });
}


module.exports = {
    connectToShushDB
}
