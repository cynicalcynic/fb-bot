const Command = require('../command.js');
const request = require('request-promise');

module.exports = new Command(async (args) => {
    try{
        const {text} = await request('https://uselessfacts.jsph.pl/random.json?language=en').then(r=>JSON.parse(r));
        // const fact = JSON.parse(res).text;
        return {
            text
        }
    }
    catch(e){
        console.log(e);
        return {text : `something went wrong :C`};
    }
}, 
{
    triggers : ['fact'],
    description : 'a random fact'
});
