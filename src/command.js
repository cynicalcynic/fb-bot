class Command{
    constructor(fn, props){
        this.fn = fn;
        this.props = props;
    }

    execute(args){
        return this.fn(args);
    }
}

module.exports = Command;