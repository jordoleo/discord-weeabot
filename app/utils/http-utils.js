import axios from 'axios';

class HttpUtils {
    get(url, config = {}) {
        return axios.get(url, config)
    }

    post(url, body = {}, config = {}) {
        return axios.post(url, body, config);
    }

    constructUrlParameter(url, parameters = {}) {
        let newUrl = url;
        Object.entries(parameters).forEach(([[key, value], index]) => {
            let separator = '&';
            if (index === 0) {
                separator = "?";
            }
            newUrl += separator + key + "=" + value;
        });
        return newUrl;
    }
}

export default new HttpUtils();