import {Message} from 'discord.js';

abstract class Module {
    available: boolean = true;

    constructor() {
        this.init();
    }

    abstract run(message: Message): void;

    execute(message: Message) {
        if (this.isAvailable() && this.validate(message)) {
            this.run(message);
        }
    }

    isAvailable() {
        return this.available;
    }

    validate(message: Message) {
        return true;
    }

    init() {
    }
}

export default Module;