import {httpUtils} from "../../../utils";

class CoingeckoClient {
    baseURL = "https://api.coingecko.com/api/v3"

    getAllCoins() {
        return new Promise((resolve, reject) => {
            httpUtils
                .get(this.baseURL + "/coins/list")
                .then(data => {
                    resolve(data.data)
                })
                .catch(err => {
                    reject(err)
                })
        });
    }

    getCoinMarketInfo(coins: Array<String>, targetCurrency: string = "idr") {
        const param = {
            "ids": coins.join(","),
            "vs_currency": targetCurrency
        }
        return new Promise((resolve, reject) => {
            httpUtils.get(this.baseURL + "/coins/markets?" + httpUtils.constructQueryParam(param))
                .then(res => {
                    resolve(res.data);
                })
                .catch(err => {
                    reject(err);
                })
        });
    }
}

export default CoingeckoClient