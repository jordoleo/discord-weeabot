import {httpUtils} from "../../../utils";

class RedditClient {
    accessToken: string = '';
    expiredTime: number;

    constructor() {
        this.expiredTime = Date.now()
    }

    getAccessToken() {
        return httpUtils.postWithJsonString("https://www.reddit.com/api/v1/access_token", {
            "grant_type": "password",
            "username": process.env.REDDIT_USERNAME,
            "password": process.env.REDDIT_PASSWORD
        }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": process.env.REDDIT_USER_AGENT
            },
            auth: {
                "username": process.env.REDDIT_APP_ID,
                "password": process.env.REDDIT_APP_SECRET
            }
        }).then(res => {
            const time = Date.now();
            this.accessToken = res.data.access_token;
            this.expiredTime = time + (res.data.expires_in * 1000);
        });
    }

    async getRandomDankMeme() {
        if (Date.now() > this.expiredTime) {
            return this.getRandomSubreddit("dankmeme");
        } else {
            await this.getAccessToken();
            return this.getRandomSubreddit("dankmeme");
        }
    }

    getRandomSubreddit(subreddit: string) {
        return httpUtils.get(`https://oauth.reddit.com/r/${subreddit}/random`, {
            headers: {
                "Authorization": `Bearer ${this.accessToken}`
            }
        });
    }
}

export default RedditClient;