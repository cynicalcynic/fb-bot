const Command = require('../reddit-command.js');
const {arrayRandom} = require('../utils/utils.js');
const request = require('request-promise');

module.exports = new Command( 
{
    triggers : ['hentai', 'anime'],
    endpoint : '/r/hentai.json?t=day&limit=100',
    cooldown : 20000,
    description : 'displays a random hentai image',
    nsfw : true
});