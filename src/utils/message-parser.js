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
    const escapedPrefix = prefix.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&'); //escape the user input
    let body = message.replace(RegExp(prefix, 'i'), '');
    let regex = RegExp(`^${escapedPrefix}.*`, 'gi');
    if(!regex.test(message)) return new ParsedMessage(false, null, null, body, prefix);

    keywords = body.match(/[^\ "]+|"(?:\\"|[^"])+"/g).map((el) => el.replace(/\"/g, ''));
    return new ParsedMessage(true, keywords[0], keywords.slice(1), body, prefix);
}