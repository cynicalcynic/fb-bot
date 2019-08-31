const Command = require('../command.js');

module.exports = new Command(async (args, message, bot) => {
    let target;
    if(!args[0]){
        const {name} = await bot.client.getUserInfo(message.authorId);
        target = name;
    }
    else
        target = args.join(' ');
    return {
        text: `*${target}:*`,
        attachment: ['../assets/brainlet.jpg']
    }
}, 
{
    triggers : ['mock', 'stupid']
});