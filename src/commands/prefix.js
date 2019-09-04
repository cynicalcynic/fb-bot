const Command = require('../command.js');

module.exports = new Command(async (args, {threadID}, {db}) => {
    let response;
    if(args[0]){
        const newPrefix = args[0];
        db.setThreadConfig(threadID, 'prefix', newPrefix);
        response = `Ok, the prefix is now \"${newPrefix}\"`;
    }
    else
        response = 'next time give me the prefix'

    return {
        text: response
    }
}, 
{
    triggers : ['prefix'],
    description : ['changes the command prefix'],
    usage : '{command} prefix',
    admin : true
});