const {promisify} = require('util');

module.exports = (bot) => ({
    
    getThreadConfig(threadID){
        const defaultConfig = {
            prefix : '!',
            nsfw : false,
            swears : false
        }

        if(!bot.config.has(threadID)){
            bot.config.set(threadID, defaultConfig);
        }
        return bot.config.get(threadID);
    },

    setThreadConfig(threadID, prop, value){
        const config = this.getThreadConfig(threadID);
        config[prop] = value;
    },

    async getThreadInfo(threadID){
        const res = await bot.redis.get(threadID);
        if(!res){
            const info = await promisify(bot.client.getThreadInfo)(threadID);
            bot.redis.set(threadID, JSON.stringify(info), 'EX', 60 * 60);
            return info;
        }
        else{
            return JSON.parse(res);
        }
    },

    async getUserInfo(userID){
        const res = await bot.redis.get(userID);
        if(!res){
            const info = await promisify(bot.client.getUserInfo)(userID);
            bot.redis.set(userID, JSON.stringify(info)[userID], 'EX', 60 * 60);
            return info;
        }
        else{
            return JSON.parse(res)[userID];
        }
    }

});