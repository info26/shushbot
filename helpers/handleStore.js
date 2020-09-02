const filesystem = require('fs');

function syncStore(client){
    //console.log("list of servers" + JSON.stringify(client.guilds.cache));
	console.log("whospracticing before " + JSON.stringify(whospracticing))	
    client.guilds.cache.forEach(servers => {
        voicechannels = servers.channels.cache.filter(c => c.type === 'voice')
        //console.log("list of vcs" + JSON.stringify(voicechannels));
        voicechannels.forEach(channel => {
            if(APPLIED_CHANNELS.includes(channel.id)){
                if (!channel.members.array().includes(whospracticing[channel.id]) || whospracticing[channel.id] == null){
					whospracticing[channel.id] = 'upforgrabs';
                    whospracticing[channel.id + "piece"] = null;
				}
            }
        });
    });
	console.log("after " + JSON.stringify(whospracticing));
}

function parseDataFromStore(){
    return new Promise(function(resolve, reject){
        filesystem.readFile('./store', (err, data) => {
            if(err){
                reject(err);
            } else {
                whospracticing = JSON.parse(data);
                console.log("parsed store file");
                resolve();
            }
            
        });
    });
}
module.exports = {
    syncStore,
    parseDataFromStore
}