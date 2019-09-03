const Command = require('../command.js');

module.exports = new Command(async (args) => {
    return {
        text: '( ͡° ͜ʖ ͡°)'
    }
}, 
{
    triggers : ['lenny', 'lennyface'],
    description : 'displays a lennyface'
});