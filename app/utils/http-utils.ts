import axios, {AxiosInstance} from 'axios';
import FormData = require("form-data");
import qs from 'qs';

class HttpUtils {
    api: AxiosInstance;

    constructor() {
        this.api = axios.create();
    }

    get(url: string, config = {}) {
        return this.api.get(url, config)
    }

    post(url: string, body = {}, config = {}) {
        return this.api.post(url, body, config);
    }

    postWithJsonString(url: string, body = {}, config = {}) {
        return this.api.post(url, qs.stringify(body), config);
    }

    postWithFormData(url: string, body: {[key: string]: any} = {}, config = {}) {
        const formData = new FormData();
        for (let bodyKey in body) {
            formData.append(bodyKey, body[bodyKey]);
            console.log(bodyKey, body[bodyKey]);
        }
        console.log(formData.getHeaders());
        return this.api.post(url, formData, config);
    }
}

export default new HttpUtils();