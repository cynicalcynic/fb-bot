const Command = require('../command.js');

module.exports = new Command(async (args, message, {db}) => {
    const newPrefix = args[0];
    let response;
    if(args[0]){
        db.setThreadConfig(message.threadId, 'prefix', newPrefix);
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
    descriptions : ['changes the command prefix'],
    usage : '{command} prefix'
});