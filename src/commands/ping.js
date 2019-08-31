const Command = require('../command.js');
const {random} = require('../utils/utils.js');

module.exports = new Command(async (args, message, {bootTime}) => {
    const uptime = new Date(Date.now() - bootTime)
    const hours = Math.floor(uptime / 3600000);  
    const minutes = Math.floor((uptime - hours * 3600000) / 60000);
    const seconds = Math.floor((uptime - hours * 3600000 - minutes * 60000) / 1000);
    const string = `${hours}h ${minutes}m ${seconds}s`
    return {
        text: 'I\'m fine thx m8\n\nuptime: ' + string
    }
}, 
{
    triggers : ['ping', 'status']
});