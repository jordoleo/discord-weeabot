import Module from "../module";
import {httpUtils} from '../../utils';
import MessageBuilder from '../../service/builder/message-builder';

class MagicBall extends Module {
    constructor() {
        super();
        this.available = false;
    }

    run(message) {
        // TODO refactor
        for (const key in this.customResponses) {
            if (this.customResponses.hasOwnProperty(key)) {
                if (message.content.includes(key)) {
                    this.reply(message, this.customResponses[key]);
                    return;
                }
            }
        }
        const scenarioIndex = Math.floor(Math.random() * this.scenarios.length);
        const scenario = this.responses[this.scenarios[scenarioIndex]];
        const responseIndex = Math.floor(Math.random() * scenario.length);
        this.reply(message, scenario[responseIndex]);
    }

    reply(message, replyContent) {
        const content = message.content;
        const embedMessage = new MessageBuilder()
            .setTitle("Answering " + message.author.username + " question:")
            .addField("Question", content.substr(content.indexOf(" ") + 1))
            .addField("Answer", replyContent)
            .build();
        message.channel.send(embedMessage);
    }

    validate(message) {
        const words = message.content.split(" ");
        if (words.length > 1) {
            return true;
        }
        message.channel.send(new MessageBuilder().addField("Usage", words[0] + " [question]").build());
        return false;
    }

    async load() {
        try {
            this.responses = await this.loadResponse();
            this.customResponses = await this.loadCustomResponse();
            this.scenarios = Object.keys(this.responses);
            this.available = true;
            console.info("Magic ball is ready");
        } catch (err) {
            console.error("Error when loading magic ball responses");
            console.error(err);
            this.available = false;
        }
    }

    loadResponse() {
        const responsesUrl = process.env.MBALL_RESPONSE;
        return httpUtils.get(responsesUrl).then(res => res.data);
    }

    loadCustomResponse() {
        const customResponsesUrl = process.env.MBALL_CUSTOM_RESPONSE;
        return httpUtils.get(customResponsesUrl).then(res => res.data);
    }
}

const m = new MagicBall();
m.load();
export default m;