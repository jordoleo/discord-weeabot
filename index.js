import express from 'express';
import { config } from 'dotenv';
import { Client } from 'discord.js';
import { commandUtils } from './utils';
import { COMMAND } from './consts';
import { magicBall } from './modules';

config();

const client = new Client();

client.once('ready', () => {
    console.log('WeeaBot is online!');
});

client.on('message', msg => {
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
    
}); 

client.login(process.env.BOT_TOKEN);

const port = process.env.PORT | 5000;
const app = express();
app.listen(port, () => {});