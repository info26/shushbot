const MongoClient = require('mongodb').MongoClient;

// Connection URL
const uri = process.env.mongoUri;



// Create a new MongoClient
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});


// Use connect method to connect to the Server
function connectToShushDB(callback) {
    client.connect(function(err, client) {
        global.db = client.db('ShushBot');
        return callback(err);
    });
}


module.exports = {
    connectToShushDB
}
