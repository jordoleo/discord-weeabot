import Module from "../module";
import {Message} from "discord.js";

class ChoicePick extends Module {
    run(message: Message): void {
        let content = message.content.split(" ");
        content[0] = 'a!pick';
        message.channel.send(content.join(" "));
    }
}

export default new ChoicePick();