function enablechs(msg) {
    var cmd = msg.content.match(/[0-9]{16,}/g);
    
    console.log(cmd);

    //make sure user calling the command is a moderator
    if (msg.member.permissions.has(['MANAGE_GUILD'])) {
        var i;
        var txtCh = cmd[cmd.length - 1];
        //make sure user inputs at least one vc and exactly one txtch
        if(cmd.length < 2){
            msg.reply("(X) too few commands, please add atleast one voice chat and exactly one text channel");
            return;
        }
        //cmd[-1] is the text channel - so iterate though the list until just before the last element
        for (i = 0; i < cmd.length - 1; i++) {
            //update applied channels list
            if (APPLIED_CHANNELS.includes(cmd[i])) {
                //don't re-add/duplicate into the array - do nothing
            }
            else {
                APPLIED_CHANNELS.push(cmd[i]);
            }
            //now update broadcast channels map/dict
            //if vc is already tied to a text channel, update the channel - if not - just add new key-value pair
            BROADCAST_CHANNELS[cmd[i]] = txtCh;
        }
        msg.reply("(X) New configuration has been added or updated");
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
    if (msg.member.permissions.has(['MANAGE_GUILD'])) {
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
                    APPLIED_CHANNELS.splice(APPLIED_CHANNELS.indexOf(cmd[i]), 1);
                    delete BROADCAST_CHANNELS[cmd[i]];
                }
            }
            msg.reply("(X) valid channels have been removed from the configuration");
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