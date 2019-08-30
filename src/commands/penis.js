const Command = require('../command.js');
const {random} = require('../utils/utils.js');

module.exports = new Command(async (args) => {
    return {
        text: `8${'='.repeat(random(1, 20))}D`
    }
}, 
{
    triggers : ['penis']
});