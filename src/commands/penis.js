const Command = require('../command.js');
const {random} = require('../utils/utils.js');

module.exports = new Command(async (args, message, bot) => {
    let target;
    if(!args[0] || args[0] == 'me'){
        target = 'Your';
    }
    else
        target = `${args.join(' ')}'s`;
    return {
        text: `*${target} peepee*\n\n8${'='.repeat(random(1, 20))}D`
    }
}, 
{
    triggers : ['penis', 'howbig', 'peepee'],
    description : 'a 100% accurate peepee measuring tool'
});