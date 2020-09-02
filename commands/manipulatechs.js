function setbit(msg){
    vc = msg.member.voice.channel;
    var cmd = msg.content.split(" "); 
    if(msg.member.hasPermission('MANAGE_ROLES') || msg.author.id == whoispracticing[msg.channel.id]){
        if(cmd.size < 2){
            msg.reply("improper arguments for this command");
        }
        else if (parseInt(cmd[1]) > 384 || parseInt(cmd[1]) < 8){
            msg.reply("bitrate range is out of bounds");
        }
        else {
            vc.setBitrate(parseInt(cmd[1]));
        }
    }
    else {
        msg.reply("You or not practicing/have permissions to execute this command")
    }
}


function userlimit(msg){
    vc = msg.member.voice.channel;
    var cmd = msg.content.split(" "); 
    if(msg.member.hasPermission('MANAGE_ROLES') || msg.author.id == whoispracticing[msg.channel.id]){
        if(cmd.size < 2){
            msg.reply("improper arguments for this command");
        }
        else if (parseInt(cmd[1]) > 99){
            msg.reply("userlimt range is out of bounds");
        }
        else {
            vc.setUserLimit(parseInt(cmd[1]));
        }
    }
    else {
        msg.reply("You or not practicing/have permissions to execute this command")
    }
}

module.exports = {
    setbit,
    userlimit
}