import axios from 'axios';

class HttpUtils {
    get(url: string, config = {}) {
        return axios.get(url, config)
    }

    post(url: string, body = {}, config = {}) {
        return axios.post(url, body, config);
    }
}

export default new HttpUtils();