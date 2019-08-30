const {readdirSync} = require('fs');
const {join} = require('path');
const {Client} = require('libfb');
const parseMessage = require('./utils/message-parser.js');
const fetch = require('node-fetch');
const request = require('request');
const https = require('https');

class Bot{
    constructor(username, password){
        this.client = new Client();
        this.commands = []
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
        this.client.on('message', this.parseMessage.bind(this));
    }

    async parseMessage(message){ 
        let {success, args, cmd} = parseMessage(message.message, '!');
        if(success){
            let command = this.commands.find((command) => command.props.triggers.includes(cmd));
            if(command !== undefined){
                let {text} = await command.execute(args);
                this.client.sendMessage(message.threadId, text);
            }
            else{
                this.client.sendMessage(message.threadId, 'I dont know what you want me to do faggot');
            }
        }
    }
}

module.exports = Bot;