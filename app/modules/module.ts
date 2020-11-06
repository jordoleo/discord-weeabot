import {Message} from 'discord.js';

abstract class Module {
    available: boolean = true;

    constructorz() {
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
    }

    init() {
    }
}

export default Module;