import Module from "../module";
import fs from 'fs';

class MagicBall extends Module {
    loadResponses() {
        this.responses = JSON.parse(fs.readFileSync("./files/mball-response.json"));
        this.scenarios = Object.keys(this.responses);
    }

    run (message) {
        const msg = message.content;
        if (msg.toLowerCase().includes("azen small pp")) {
            message.reply("Always has been");
        }
        const scenarioIndex = Math.floor(Math.random() * this.scenarios.length);
        const scenario = this.responses[this.scenarios[scenarioIndex]];
        const responseIndex = Math.floor(Math.random() * scenario.length);
        message.reply(scenario[responseIndex]);
    }

    init() {
        this.loadResponses();
    }

    validate(message) {
        const words = message.content.split(" ");
        if (words.length > 1) {
            return true;
        }
        message.reply("Usage: " + words[0] + " [question]");
        return false;
    }
}

export default new MagicBall();