import fetch from 'node-fetch';

class HttpUtils {
    get(url) {
        return fetch(url);
    }

    getJson(url) {
        return this.get(url)
            .then(res => res.json())
            .then(json => json);
    }
}

export default new HttpUtils();