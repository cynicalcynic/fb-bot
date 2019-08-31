const Command = require('../command.js');
const {random} = require('../utils/utils.js');

module.exports = new Command(async () => {
    return {
        text: 'pong'
    }
}, 
{
    triggers : ['ping']
});