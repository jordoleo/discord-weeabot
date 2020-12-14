import {Message} from "discord.js";
import MessageBuilder from "../service/builder/message-builder";

class ErrorNotifyUtils {
    notifyDiscordError(message: Message, error: string = "An error has occured, please try again") {
        const embedMessage = MessageBuilder.new().setTitle(error).build();
        message.channel.send(embedMessage);
    }
}

export default new ErrorNotifyUtils();