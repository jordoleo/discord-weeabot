import Module from "../module";
import {Message} from "discord.js";
import RedditClient from "../../service/api-client/reddit-client";
import MessageBuilder from "../../service/builder/message-builder";
import {errorNotifyUtils} from "../../utils";

class Meme extends Module {

    redditClient!: RedditClient;
    private MAX_RETRY_COUNT = 5;

    run(message: Message): void {
        this.retrieveMeme(message);
    }

    retrieveMeme(message: Message, count = 1) {
        if (count >= this.MAX_RETRY_COUNT) {
            errorNotifyUtils.notifyDiscordError(message);
            return;
        }
        try {
            this.redditClient.getRandomDankMeme().then(res => {
                const post = res.data[0].data.children[0].data;
                if (post.post_hint != "image") {
                    this.retrieveMeme(message, count++);
                } else {
                    const embedMessage = new MessageBuilder().setTitle(post.title)
                        .setTitle(post.title)
                        .addDescription(`requested by ${message.author.toString()}`)
                        .setImage(post.url)
                        .build();
                    message.channel.send(embedMessage);
                }
            })
        } catch(e) {
            errorNotifyUtils.notifyDiscordError(message);
        }
    }

    init() {
        super.init();
        this.redditClient = new RedditClient();
        this.redditClient.getAccessToken().then(() => {
            console.log("Meme is ready");
        }).catch(err => {
            console.log("Unable to retrieve access token: ", err)
        });
    }
}

export default new Meme();