const {readdirSync, ensureDirSync, unlink} = require('fs-extra');
const {join} = require('path');
const {Client} = require('libfb');
const parseMessage = require('./utils/message-parser.js');
const fetch = require('node-fetch');
const request = require('request-promise');
const https = require('https');
const {downloadFile} = require('./utils/utils.js')
const uuid = require('uuid/v1');

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
                let {text, attachment} = await command.execute(args);
                if(attachment !== undefined){
                    for(let img of attachment){
                        const tempDir = join(__dirname, 'tmp');
                        ensureDirSync(tempDir);
                        let filePath = join(tempDir, uuid());
                        await downloadFile(img, filePath);
                        this.client.sendAttachmentFile(message.threadId, filePath).then(()=>unlink(filePath));
                    }
                }
                else if(text !== undefined)
                    this.client.sendMessage(message.threadId, text);
            }
            else{
                this.client.sendMessage(message.threadId, 'I dont know what you want me to do faggot');
            }
        }
    }
}

module.exports = Bot;