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

    addDescriotion(desc) {
        if (this.message.description) {
            this.message.setDescription(this.message.description + "\n" + desc);
        } else {
            this.message.setDescription(desc);
        }

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