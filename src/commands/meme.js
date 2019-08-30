const Command = require('../command.js');
const {random} = require('../utils/utils.js');
const request = require('request-promise');

module.exports = new Command(async (args) => {

    let howMany = args[0]?Number(args[0]):1;
    if(isNaN(howMany) || howMany < 1){
        return {
            text : 'wtf are you trying to do?'
        };
    }
    else if(howMany > 10){
        return {
            text : 'number must be less or equal to 10'
        }
    }
    else {
        let urls = [];
        for(let i = 1; i<=howMany; ++i){
            let response = await request('https://meme-api.herokuapp.com/gimme');
            urls.push(JSON.parse(response).url);
        }
        return {
            attachment : urls
        }
    }   
}, 
{
    triggers : ['meme']
});