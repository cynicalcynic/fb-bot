const Bot = require('./src/bot.js');
const argv = require('yargs').argv;

const bot = new Bot(argv.username, argv.password);