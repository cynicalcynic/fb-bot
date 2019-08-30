const Command = require('../command.js');
const {random} = require('../utils/utils.js');
const request = require('request-promise');

module.exports = new Command(async (args) => {

    let response = await request('https://meme-api.herokuapp.com/gimme');
    let url = JSON.parse(response).url;
    return {
        attachment : url
    }
}, 
{
    triggers : ['meme']
});