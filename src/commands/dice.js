const Command = require('../command.js');
const {random} = require('../utils/utils.js');

module.exports = new Command(async (args) => {
    let upper = args[0]?Number(args[0]):6
    return {
        text : (upper < -1 || isNaN(upper)) ? 'wtf dude, srsly?' : `${random(1, upper)}`
    }
}, 
{
    triggers : ['roll', 'dice']
});