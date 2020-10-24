import express from 'express';
import {Client} from 'discord.js';
import dispatch from "./service/dispatcher";


const start = () => {
    const client = new Client();
    client.once('ready', () => {
        console.log('WeeaBot is online!');
    });
    client.on('message', msg => {
        dispatch(msg);
    });
    client.login(process.env.BOT_TOKEN);

    const port = process.env.PORT || 5000;
    const app = express();
    app.listen(port, () => {
    });
};

export default start;