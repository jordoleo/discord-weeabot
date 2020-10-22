class Module {
    constructor () {
        if (this.constructor === Module) {
            throw new Error("Abstract classes can't be instantiated");
        }
        this.init();
    }

    run (message) {
        throw new Error("Method 'run()' must be implemented.");
    }

    execute (message) {
        if (this.validate(message)) {
            this.run(message);
        }
    }

    validate (message) {}

    init () {}
}

export default Module;