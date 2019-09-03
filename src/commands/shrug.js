const Command = require('../command.js');

module.exports = new Command(async (args) => {
    return {
        text: '¯\_(ツ)_/¯'
    }
}, 
{
    triggers : ['shrug', 'whatever'],
    description : 'shrugs'
});