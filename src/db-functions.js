module.exports = (bot) => ({
    
    getThreadConfig(threadId){
        const defaultConfig = {
            prefix : '!',
            nsfw : false,
            swears : false
        }

        if(!bot.config.has(threadId)){
            bot.config.set(threadId, defaultConfig);
        }
        return bot.config.get(threadId);
    },

    setThreadConfig(threadId, prop, value){
        const config = this.getThreadConfig(threadId);
        config[prop] = value;
    }

});