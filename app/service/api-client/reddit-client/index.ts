import {httpUtils} from "../../../utils";

class RedditClient {
    accessToken: string = '';
    expiredTime: number;

    constructor() {
        this.expiredTime = Date.now()
    }

    getAccessToken(callback?: Function) {
        httpUtils.postWithJsonString("https://www.reddit.com/api/v1/access_token", {
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
            if (callback) {
                callback();
            }
        }).catch(err => {
            console.log("Unable to retrieve access token: ", err)
        });
    }

    getRandomDankMeme(callback: Function) {
        if (Date.now() < this.expiredTime) {
            this.getRandomSubreddit("dankmeme", callback);
        } else {
            this.getAccessToken(() => {
                this.getRandomSubreddit("dankmeme", callback);
            });
        }
    }

    getRandomSubreddit(subreddit: string, callback: Function) {
        httpUtils.get(`https://oauth.reddit.com/r/${subreddit}/random`, {
            headers: {
                "Authorization": `Bearer ${this.accessToken}`
            }
        }).then(res => {
            callback(res);
        });
    }
}

export default RedditClient;