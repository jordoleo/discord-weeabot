import Discord from 'discord.js';

class MessageBuilder {
    constructor() {
        this.message = new Discord.MessageEmbed();
    }

    setTitle(title) {
        this.message.setTitle(title);
        return this;
    }

    addField(key, value) {
        this.message.addField(key, value);
        return this;
    }

    addQuotedField(key, value) {
        this.addField(key, '`' + value + '`');
        return this;
    }

    build() {
        return this.message;
    }
}

export default MessageBuilder;