const request = require('request-promise');
const {arrayRandom} = require('./utils/utils.js');

class RedditCommand{
    constructor(props){
        this.props = props;
    }
    async execute(args, message, bot){

        let res = await request('https://www.reddit.com' + this.props.endpoint);
        const posts = JSON.parse(res).data.children.filter(post=>post.data.post_hint == 'image');
        const meme = arrayRandom(posts).data.url;
        return {
            attachment : [meme]
        }
    }
}

module.exports = RedditCommand;