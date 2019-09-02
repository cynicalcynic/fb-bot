const request = require('request-promise');
const {arrayRandom} = require('./utils/utils.js');

class RedditCommand{
    constructor(props){
        this.props = props;
    }
    async execute(args, message, bot){

        let res;
        let cached = await bot.redis.get(this.props.endpoint).then(r=>JSON.parse(r));
        if(cached){
           res = cached;
        }
        else{
            try{
                res = await request('https://www.reddit.com' + this.props.endpoint);
            }
            catch(e){
                return {text : 'meme machine broke\n' + e}
            }
            
            bot.redis.set(this.props.endpoint, JSON.stringify(res), 'EX', 15 * 60);
        }

        const posts = JSON.parse(res).data.children.filter(post=>post.data.post_hint == 'image');
        return {
            attachment: [arrayRandom(posts).data.url]
        }
        
    }
}

module.exports = RedditCommand;