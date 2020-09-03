const userLeftorNoMore = require("../helpers/userLeftorNoMore");

function enablechs(msg) {

    var cmd = msg.content.match(/[0-9]{16,}/g);
    console.log(cmd);

    //make sure user calling the command is a moderator
    if (msg.member.permissions.has(['ADMINISTRATOR'])) {
        var i;
        try {
            var txtCh = cmd[cmd.length - 1];
        } catch {
            msg.reply("Incorrect usage. $help for more details")
        }
        //make sure user inputs at least one vc and exactly one txtch
        if(cmd.length < 2){
            msg.reply("(X) too few commands, please add at least one voice chat and exactly one text channel");
            return;
        }
        if (msg.guild.channels.cache.find(ch => ch.id === txtCh).type != "text") {
            msg.reply("Invalid text channel assignment. Command usage: ```$enablechs vcId1, vcId2, ..., vcIdn, txtChId``` (Assigns voice channel ids `1` - `n` to `txtChId`).")
            return;
        }
        //cmd[-1] is the text channel - so iterate though the list until just before the last element
        for (i = 0; i < cmd.length - 1; i++) {
            //update applied channels list
            if (msg.guild.channels.cache.find(ch => ch.id === cmd[i]).type != "voice"){
                msg.reply("Invalid voice channel ID or invalid assignments. Command usage: ```$enablechs vcId1, vcId2, ..., vcIdn, txtChId``` (Assigns voice channel ids `1` - `n` to `txtChId`).")
                return;
            } else {
                if (APPLIED_CHANNELS.includes(cmd[i])) {
                    //don't re-add/duplicate into the array - do nothing
                }
                else {
                    APPLIED_CHANNELS.push(cmd[i]);
                    whospracticing[cmd[i]] = "upforgrabs";
                    var connectedMembers = msg.guild.channels.cache.find(ch => ch.id === cmd[i]).members
                    connectedMembers.forEach(user =>
                        user.voice.setMute(true, "Channel has been enabled.")
                    )
                }
                //now update broadcast channels map/dict
                //if vc is already tied to a text channel, update the channel - if not - just add new key-value pair
                BROADCAST_CHANNELS[cmd[i]] = txtCh;
            }
        }
        msg.reply("New configuration has been added or updated");
        return;
    }
    else {
        msg.reply("(X) You do not have the permissions to use this command");
        return;
    }
}

function disablechs(msg) {
    var cmd = msg.content.match(/[0-9]{16,}/g);
    console.log(cmd);

    //make sure user calling the command is a moderator
    if (msg.member.permissions.has(['ADMINISTRATOR'])) {
        //make sure user does not try and delete more channels from configuration than what already exists
        if (cmd.length > APPLIED_CHANNELS.length) {
            msg.reply("(X) You have specified too many arguments. ");
            return;
        }
        else {
            var i;
            //remove voice channels from applied channels array and broadcast channels dict/map
            for (i = 0; i < cmd.length; i++) {
                if(APPLIED_CHANNELS.includes(cmd[i])) {
                    var connectedMembers = msg.guild.channels.cache.find(ch => ch.id === cmd[i]).members
                    connectedMembers.forEach(user =>{
                        user.voice.setMute(false, "Channel has been disabled.")      
                        if(whospracticing[cmd[i]] == user.id){
                            userLeftorNoMore(user.voice);
                        }
                    });

                    APPLIED_CHANNELS.splice(APPLIED_CHANNELS.indexOf(cmd[i]), 1);
                    delete BROADCAST_CHANNELS[cmd[i]];
                }
            }
            msg.reply("Valid channels have been removed from the configuration");
            return;
        }
    }
    else {
        msg.reply("(X) You do not have the permissions to use this command");
        return;
    }
}

module.exports = {
    enablechs,
    disablechs
}