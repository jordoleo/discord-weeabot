class Module {
    constructorz() {
        if (this.constructor === Module) {
            throw new Error("Abstract classes can't be instantiated");
        }
        this.init();
    }

    run(message) {
        throw new Error("Method 'run()' must be implemented.");
    }

    execute(message) {
        if (this.isAvailable() && this.validate(message)) {
            this.run(message);
        }
    }

    isAvailable() {
        return this.available == null ? true : this.available;
    }

    validate(message) {}

    init() {}
}

export default Module;