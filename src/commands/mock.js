const Command = require('../command.js');

module.exports = new Command(async (args, message, bot) => {
    let target;
    if(!args[0] || args[0] == 'me'){
        target = 'Your';
    }
    else
        target = `${args.join(' ')}'s`;
    return {
        text: `*${target}:*`,
        attachment: '../assets/brainlet.jpg'
    }
}, 
{
    triggers : ['mock', 'stupid'],
    description : 'insult someone'
});