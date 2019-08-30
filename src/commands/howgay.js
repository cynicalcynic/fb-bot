const Command = require('../command.js');
const {random} = require('../utils/utils.js');

module.exports = new Command(async (args) => {
    let target = (args[0] == 'me' || !args[0]) ?'You are':`${args.join(' ')} is`
    return {
        text: `${target} ${random(1, 100)}% gay 🏳️‍🌈!`
    }
}, 
{
    triggers : ['howgay', 'gay']
});