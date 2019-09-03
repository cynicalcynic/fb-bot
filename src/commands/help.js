const Command = require('../command.js');

module.exports = new Command(async (args, {threadId}, {commands, db}) => {
    const {prefix} = db.getThreadConfig(threadId);
    let help = '';
    if(args[0]){
        let command = commands.find(c => c.props.triggers.includes(args[0]));
        if(!command)
            help += `No such command ${args[0]}`;
        else{
            const props = command.props;
            const usage = props.usage.replace('{command}', props.triggers[0]);
            help += `${prefix} ${props.triggers[0]} - ${props.description}\n` + 
                    `Usage: ${prefix} ${usage}\n`;
        }
    }
    else
    {
        commands.forEach(({props}) => {
            help += `${prefix} ${props.triggers[0]} - ${props.description}\n`;
        });
    }
    help += `\nYou can also call '${prefix} help command' to see specific command help`;
    return {
        text : help
    }
}, 
{
    triggers : ['help'],
    description : ['displays this help'],
    usage : '{command} command'
});