import Module from '../module';
import MessageBuilder from "../../service/builder/message-builder";
import myMemoryRapidAPITranslateClient from '../../service/api-client/my-memory-rapid-api-translate-client';

class Translate extends Module {
    run(message) {
        let words = message.content.split(" ").splice(1);
        if (words[0].startsWith("option:")) {
            const options = words[0].split(":");
            if (options[0] !== "option" || options.length !== 2) {
                this.translateIdEn(message, words.join(" "));
                return;
            }
            words = words.splice(1);
            const langs = options[1].split("|");
            if (options.length === 1) {
                const to = langs[0];
                this.translateIdTo(message, words.join(" "), to);
            } else {
                const to = langs[1];
                const from = langs[0];
                this.translate(message, words.join(" "), to, from);
            }
            return;
        }
        this.translateIdEn(message, words.join(" "));
    }

    translateIdEn(message, text) {
        this.translate(message, text, "en", "id");
    }

    translateIdTo(message, text, to) {
        this.translate(message, text, to, "id");
    }

    translate(message, text, to, from) {
        myMemoryRapidAPITranslateClient.translate(text, to, from).then((res) => {
            const embedMessage = new MessageBuilder()
                .setTitle("Translate from " + from + " to " + to)
                .addField("Text", text)
                .addField("Result", res.data.responseData.translatedText)
                .build();
            message.channel.send(embedMessage);
        }).catch(err => {
            console.log(err);
        });
    }

    validate(message) {
        const words = message.content.split(" ");
        if (words.length > 1) {
            return true;
        }
        message.channel.send(new MessageBuilder()
            .setTitle("Usage")
            .addDescriotion(words[0] + " [text to be translated]")
            .addDescriotion(words[0] + " option:to [text to be translated]")
            .addDescriotion(words[0] + " option:from|to [text to be translated]")
            .addField("Default", "from:id\nto:en")
            .build());
        return false;
    }
}

export default new Translate();