const {readdirSync, ensureDirSync, unlink, writeFileSync, existsSync, readFileSync} = require('fs-extra');
const {join} = require('path');
const login = require('facebook-chat-api');
const parseMessage = require('./utils/message-parser.js');
const fetch = require('node-fetch');
const Redis = require('ioredis');

class Bot{
    constructor(username, password){
        // this.client = new Client();
        this.commands = []
        this.bootTime = Date.now();
        this.redis = new Redis();
        this.cooldowns = new Map();
        if(existsSync('../config.json')){
            const config = readFileSync('../config.json');
            this.config = new Map(JSON.parse(config));
        }
        else
            this.config = new Map();
        this.db = require('./db-functions')(this);
        this.loadCommands();
        this.setupClient(username, password);

        process.on('SIGINT', ()=>{
            const config = JSON.stringify([...this.config]);
            writeFileSync('../config.json', config);
            process.exit();
        });
    }

    loadCommands(){
        const cmdDir = readdirSync(join(__dirname, 'commands'));
        cmdDir.forEach((filename)=>{
            this.commands.push(require(join(__dirname, 'commands', filename)));
        });
        
    }

    async setupClient(username, password){
        login({email : username, password, }, (err, api)=>{
            this.client = api;
            api.listen((err, event)=>{
                if(event.type == 'message') require('./message-handler.js').bind(this)(event);
            });
        });
    }
}

module.exports = Bot;
