const {readdirSync, ensureDirSync, unlink} = require('fs-extra');
const {join} = require('path');
const {Client} = require('libfb');
const parseMessage = require('./utils/message-parser.js');
const fetch = require('node-fetch');

class Bot{
    constructor(username, password){
        this.client = new Client();
        this.commands = []
        this.bootTime = Date.now();
        this.loadCommands();
        this.setupClient(username, password);
    }

    loadCommands(){
        const cmdDir = readdirSync(join(__dirname, 'commands'));
        cmdDir.forEach((filename)=>{
            this.commands.push(require(join(__dirname, 'commands', filename)));
        });
        
    }

    async setupClient(username, password){
        try{
            await this.client.login(username,password);
        }
        catch(e){
            console.log('sth went wrong. ' + e);
            process.exit(1);
        }
        console.log('logged in');
        this.client.on('message', require('./message-handler.js').bind(this));
    }
}

module.exports = Bot;