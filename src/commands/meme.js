const RedditCommand = require('../reddit-command.js');

module.exports = new RedditCommand({
    triggers : ['meme'],
    endpoint: '/r/dankmemes/top/.json?t=day&limit=100',
    description : 'displays a random meme'
})