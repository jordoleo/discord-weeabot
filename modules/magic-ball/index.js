import Module from "../module";
import { httpUtils } from '../../utils';

class MagicBall extends Module {
    constructor() {
        super();
        this.available = false;
    }

    run(message) {
        for (const key in this.customResponses) {
            if (this.customResponses.hasOwnProperty(key)) {
                if (message.content.includes(key)) {
                    message.reply(this.customResponses[key]);
                    return;
                }
            }
        }
        const scenarioIndex = Math.floor(Math.random() * this.scenarios.length);
        const scenario = this.responses[this.scenarios[scenarioIndex]];
        const responseIndex = Math.floor(Math.random() * scenario.length);
        message.reply(scenario[responseIndex]);
    }

    validate(message) {
        const words = message.content.split(" ");
        if (words.length > 1) {
            return true;
        }
        message.reply("Usage: " + words[0] + " [question]");
        return false;
    }

    async load() {
        try {
            this.responses = await this.loadResponse();
            this.customResponses = await this.loadCustomResponse();
            this.scenarios = Object.keys(this.responses);
            this.available = true;
            console.info("Magic ball is ready");
        } catch(err) {
            console.error("Error when loading magic ball responses");
            console.error(err);
            this.available = false;
        }
    }

    loadResponse() {
        const responsesUrl = new URL(process.env.MBALL_RESPONSE);
        return httpUtils.getJson(responsesUrl)
    }

    loadCustomResponse() {
        const customResponsesUrl = new URL(process.env.MBALL_CUSTOM_RESPONSE);
        return httpUtils.getJson(customResponsesUrl);
    }
}

const m = new MagicBall();
m.load();
export default m;