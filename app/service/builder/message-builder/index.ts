import {MessageAttachment, MessageEmbed, MessageEmbedImage} from 'discord.js';

class MessageBuilder {
    message: MessageEmbed;

    constructor() {
        this.message = new MessageEmbed();
    }

    setTitle(title: string) {
        this.message.setTitle(title);
        return this;
    }

    addField(key: string, value: string) {
        this.message.addField(key, value);
        return this;
    }

    addDescription(desc: string) {
        if (this.message.description) {
            this.message.setDescription(this.message.description + "\n" + desc);
        } else {
            this.message.setDescription(desc);
        }
        return this;
    }

    addQuotedField(key: string, value: string) {
        this.addField(key, '`' + value + '`');
        return this;
    }


    setImage(url: string) {
        this.message.setImage(url);
        return this;
    }

    addFile(name: string, url: string) {
        const attachment = new MessageAttachment(url, name);
        this.message.attachFiles([attachment]);
        return this;
    }

    build() {
        return this.message;
    }
}

export default MessageBuilder;