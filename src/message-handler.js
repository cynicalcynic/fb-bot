const {readdirSync, ensureDirSync, unlink} = require('fs-extra');
const {join} = require('path');
const parseMessage = require('./utils/message-parser.js');
const request = require('request-promise');
const {downloadFile} = require('./utils/utils.js')
const uuid = require('uuid/v1');

module.exports = async function messageHandler(message){
    let prefix = this.db.getThreadConfig(message.threadId).prefix;
    let {success, args, cmd} = parseMessage(message.message, prefix);
    if(!success) return;
    
    cmd = cmd.toLowerCase();
    let command = this.commands.find((command) => command.props.triggers.includes(cmd));
    
    if(command !== undefined){
        //check and set cooldown
        let userCooldowns = this.cooldowns.get(message.authorId);
        if(!userCooldowns){
            this.cooldowns.set(message.authorId, []);
            userCooldowns = this.cooldowns.get(message.authorId);
        }
        let cooldown = userCooldowns.find(c => c.triggers.includes(cmd));
        if(cooldown){
            if(cooldown.until > Date.now())
            {   
                let waitTime = cooldown.until - Date.now();
                this.client.sendMessage(message.threadId, `you have to wait ${waitTime/1000}s to use this command`);
                return;
            }
            else{
                cooldown.until = Date.now() + command.props.cooldown;
            }
        }
        else
            userCooldowns.push({triggers : command.props.triggers, until : Date.now() + command.props.cooldown});


        let {text, attachment} = await command.execute(args, message, this);
        if(text !== undefined)
            this.client.sendMessage(message.threadId, text);

        if(attachment !== undefined){
            const tempDir = join(__dirname, 'tmp');
            ensureDirSync(tempDir);
            for(let img of attachment){
                let filePath;
                if(img.startsWith('http')){
                    filePath = join(tempDir, uuid());
                    await downloadFile(img, filePath);
                    this.client.sendAttachmentFile(message.threadId, filePath).then(()=>unlink(filePath));
                }
                else{
                    filePath = join(__dirname, img);
                    this.client.sendAttachmentFile(message.threadId, filePath);
                }
            }
        }
    }
    else{
        this.client.sendMessage(message.threadId, 'I dont know what you want me to do faggot');
    }
}

// function checkCooldown(cooldown)