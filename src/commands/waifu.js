const Command = require('../command.js');
const {random} = require('../utils/utils.js');


module.exports = new Command(async (args) => {
    const reaction = [
        '🤢',
        '😰',
        '😵',
        '😥',
        '😕',
        '😗',
        '😏',
        '😌',
        '☺',
        '💁'
    ];
    if(!args[0]){
        return {text : 'Give me someone to rate dude.'}
    }
    let target = args[0] == 'me'?'You are':`${args.join(' ')} is`;
    const rating = random(1, 100);
    const emoji = Math.ceil(rating / reaction.length) - 1;
    return {
        text: `*Waifu rating machine*:\n\n${target} a ${rating}% waifu ${reaction[emoji]}`
    }
}, 
{
    triggers : ['waifu', 'rate']
});