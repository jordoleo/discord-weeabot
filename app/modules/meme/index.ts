import Module from "../module";
import {Message} from "discord.js";
import RedditClient from "../../service/api-client/reddit-client";
import MessageBuilder from "../../service/builder/message-builder";

class Meme extends Module {

    redditClient!: RedditClient;

    run(message: Message): void {
        this.redditClient.getRandomDankMeme().then(res => {
            const post = res.data[0].data.children[0].data;
            console.log(post);
            let embedMessage = null;
            if (post.is_video) {
                let videoUrl = null;
                if (post.media != null) {
                    videoUrl = post.media.reddit_video.fallback_url;
                } else {
                    videoUrl = post.secure_media.reddit_video.fallback_url;
                }
                embedMessage = new MessageBuilder().setTitle(post.title)
                    .setImage(videoUrl)
                    .build();
            } else {
                embedMessage = new MessageBuilder().setTitle(post.title)
                    .setImage(post.url)
                    .build();
            }
            console.log(embedMessage);
            message.channel.send(embedMessage);
        })
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