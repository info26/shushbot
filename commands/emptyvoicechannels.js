const { userLeftorNoMore } = require('./../helpers/userLeftorNoMore')

async function disconnectMembers(msg) {
    //find the parent(channel catrgory) of the text channel 
    var chCategory = msg.channel.parent;
    //get the roles that needs to be edited in that channel category
    var roleToBeEdited = await msg.guild.roles.fetch(process.env.roleToBeEdited);
    //get all the voice chats that are in this channel category
    var vcs = chCategory.children.filter(c => c.type === 'voice');

    //make sure the person writing the command is an admin of the server
    if (Message.member.permissions.has(['ADMINISTRATOR'])) {
        //change channel category perms so that non-mods can't enter
        chCategory.overwritePermissions([
            {
                id: roleToBeEdited.id,
                deny: ['CONNECT', 'SEND_MESSAGES']
            }
        ]);
        //for each voice chat in that category
        vcs.array().forEach(vc => {
            //makes sure the current vc is bot enabled
            if (APPLIED_CHANNELS.includes(vc.id)) {
                //for each user currently in the vc
                vc.members.array().forEach(member => {
                    //check if they're the ones practicing
                    if (whoispracticing[vc.id] != member.id) {
                        //just kick them if they're not praciticing
                        member.voice.kick();
                    }
                    else {
                        //if they are, force-end their session and kick
                        userLeftorNoMore(member.voice);
                        member.voice.kick();
                    }
                })
            }
        });
        msg.reply("Done. Voice Channels are locked and Members are kicked")
    }
    else {
        msg.reply("You do not have the permissions to execute this command");
    }
}


module.exports = {
    disconnectMembers
}
