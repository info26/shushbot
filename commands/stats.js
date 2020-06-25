const { get } = require('./../cloud/dbutils');

function getStats(userId){
    get(userid, table).then(function(data){
        console.log("RES: " + JSON.stringify(data, null, 2));
        console.log(data.Item.info.practiceStats.totalTime);
    }); 
}

module.exports = {
    getStats
}