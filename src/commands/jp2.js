const Command = require('../reddit-command.js');
const {arrayRandom} = require('../utils/utils.js');

module.exports = new Command( 
{
    triggers : ['jp2', 'jp2gmd', '2137', 'papaj', 'kremówka'],
    endpoint : '/r/2137.json?t=day&limit=100',
    descrption : 'displays a random cenzo'
});