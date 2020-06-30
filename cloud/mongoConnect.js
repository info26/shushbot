const MongoClient = require('mongodb').MongoClient;

// Connection URL
const uri = "mongodb+srv://admin:HklvEsns6PBF6Qr9@cluster0.x3ceo.mongodb.net/test?authSource=admin&replicaSet=atlas-11ohkc-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";






// Use connect method to connect to the Server
function connectToShushDB(callback) {
    // Create a new MongoClient
    const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

    client.connect(function(err, client) {
        global.db = client.db('ShushBot');
        return callback(err);
    });
}


module.exports = {
    connectToShushDB
}
