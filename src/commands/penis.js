const Command = require('../command.js');
const {random} = require('../utils/utils.js');

module.exports = new Command(async (args, message, bot) => {
    let target;
    if(!args[0]){
        const {name} = await bot.client.getUserInfo(message.authorId);
        target = name;
    }
    else
        target = args.join(' ');
    return {
        text: `*${target}'s*\n\n8${'='.repeat(random(1, 20))}D`
    }
}, 
{
    triggers : ['penis', 'howbig']
});