const {readdirSync, ensureDirSync, unlink} = require('fs-extra');
const {join} = require('path');
const parseMessage = require('./utils/message-parser.js');
const request = require('request-promise');
const {downloadFile} = require('./utils/utils.js')
const uuid = require('uuid/v1');

module.exports = async function messageHandler(message){
    let {success, args, cmd} = parseMessage(message.message, '!');
    if(success){
        let command = this.commands.find((command) => command.props.triggers.includes(cmd));
        if(command !== undefined){
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
}

