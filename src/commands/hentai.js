const Command = require('../command.js');
const {arrayRandom} = require('../utils/utils.js');
const request = require('request-promise');

module.exports = new Command(async (args) => {

    const body = await request('https://www.reddit.com/r/hentai.json');
    let parsed = JSON.parse(body);
    let url = arrayRandom(parsed.data.children).data.url;
    return {
        attachment : [url]
    }
}, 
{
    triggers : ['hentai', 'anime']
});