class Command{
    constructor(fn, props){
        this.fn = fn;
        this.props = Object.assign({
            cooldown : 3000,
            nsfw : false,
            usage : '{command}'
        }, props)
    }

    execute(args, message, bot){
        return this.fn(args, message, bot);
    }
}

module.exports = Command;