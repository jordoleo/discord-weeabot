import {commandUtils} from "../../utils";
import {COMMAND} from "../../consts";
import {choicePick, magicBall, meme, translate} from "../../modules";
import {Message} from "discord.js";

const dispatch = (msg: Message) => {
    const message = msg.content;
    const command = commandUtils.getCommand(message);
    let module = null;
    switch (command) {
        case COMMAND.BALL:
        case COMMAND.M_BALL:
            module = magicBall;
            break;
        case COMMAND.TRANSLATE:
            module = translate;
            break;
        case COMMAND.PICK:
            module = choicePick;
            break;
        case COMMAND.MEME:
            module = meme;
            break;
    }

    if (module != null) {
        module.execute(msg);
    }

    if (message === 'ping') {
        msg.reply('pong');
    }
};

export default dispatch;