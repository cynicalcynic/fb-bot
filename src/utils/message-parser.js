class ParsedMessage{
    constructor(success, cmd, args, body, prefix){
        this.success = success;
        this.cmd = cmd;
        this.body = body;
        this.args = args;
        this.prefix = prefix;
    }
}

module.exports = function parseMessage(message, prefix){
    let body = message.replace(prefix, '');
    let regex = RegExp(`^${prefix}.*`, 'g');
    if(!regex.test(message)) return new ParsedMessage(false, null, null, body, prefix);

    keywords = body.match(/[^\ "]+|"(?:\\"|[^"])+"/g).map((el) => el.replace(/\"/g, ''));
    return new ParsedMessage(true, keywords[0], keywords.slice(1), body, prefix);
}