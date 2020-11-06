import {httpUtils} from '../../../utils';

class MyMemoryRapidAPITranslateClient {
    key: string;

    constructor() {
        this.key = String(process.env.RAPID_API_KEY);
    }

    translate(text: string, to: string, from: string) {
        return httpUtils.get('https://translated-mymemory---translation-memory.p.rapidapi.com/api/get', {
            "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"translated-mymemory---translation-memory.p.rapidapi.com",
                "x-rapidapi-key":this.key,
                "useQueryString":true
            },"params":{
                "langpair": from + "|" + to,
                "q":text
            }
        });
    }
}

export default new MyMemoryRapidAPITranslateClient();