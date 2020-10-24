import {commandUtils} from "../../utils";
import {COMMAND} from "../../consts";
import {magicBall} from "../../modules";

const dispatch = msg => {
    const message = msg.content;
    const command = commandUtils.getCommand(message);
    let module = null;
    switch (command) {
        case COMMAND.BALL:
        case COMMAND.M_BALL:
            module = magicBall;
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