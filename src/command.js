class Command{
    constructor(fn, props){
        this.fn = fn;
        this.props = props;
    }

    execute(args, message, bot){
        return this.fn(args, message, bot);
    }
}

module.exports = Command;