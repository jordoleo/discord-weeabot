import Module from "../module";
import CoingeckoClient from '../../service/api-client/coingecko-client'
import {Message} from "discord.js";
import MessageBuilder from "../../service/builder/message-builder";

class Coingecko extends Module {

    coingeckoClient!: CoingeckoClient
    cryptoMapSymbol!: Map<string, string>
    cryptoMapName!: Map<string, string>

    run(message: Message): void {
        const contents = message.content.split(" ").splice(1);
        const ids = this.parseToIds(contents[0].split(","));
        if (ids.length == 0) {
            message.channel.send(new MessageBuilder().addField("Error fetching coin data", "Please check provided parameters").build());
            return;
        }
        let promise: Promise<any>
        if (contents.length == 1) {
            promise = this.coingeckoClient.getCoinMarketInfo(ids);
        }
        else if (contents.length == 2) {
            const targetCurrency = contents[1];
            promise = this.coingeckoClient.getCoinMarketInfo(ids, targetCurrency)
        }
        else {
            return
        }
        promise.then(data => {
            let embedMessage = new MessageBuilder();
            data.forEach((d: any) => {
                const result = [
                    "Current Price: " + d.current_price,
                    "High 24h: " + d.high_24h,
                    "Low 24h: " + d.low_24h,
                    "Price change 24h: " + d.price_change_percentage_24h + "%"
                ]
                embedMessage = embedMessage.addField("Coin: " + d.name, result.join("\n"))
            })
            message.channel.send(embedMessage.build());
        }).catch(err => {
            console.log("Error fetching crypto:", err)
            message.channel.send(new MessageBuilder().addField("Error fetching coin data", "Please check provided parameters").build());
            return;
        });
    }

    validate(message: Message) {
        const words = message.content.split(" ");
        if (words.length >= 2 && words.length <= 3) {
            return true;
        }
        message.channel.send(new MessageBuilder().addField("Usage", words[0] + " [coin1(,coin2,..)] [target currency | default idr]").build());
        return false;
    }

    init() {
        super.init();
        this.available = false
        this.coingeckoClient = new CoingeckoClient();
        this.cryptoMapName = new Map();
        this.cryptoMapSymbol = new Map();
        this.coingeckoClient.getAllCoins()
            .then((data: any) => {
                for (let key in data) {
                    let crypto = data[key];
                    this.cryptoMapSymbol.set(crypto.symbol, crypto.id)
                    this.cryptoMapName.set(crypto.name, crypto.id)
                }
                console.log("Crypto is ready")
                this.available = true
            })
            .catch(err => {
                console.log("Crypto is unavailable because of error:", err)
            })
    }

    getCryptoId(value: string) : string | undefined {
        if (this.cryptoMapSymbol.get(value) != undefined) {
            return this.cryptoMapSymbol.get(value);
        }
        if (this.cryptoMapName.get(value) != undefined) {
            return this.cryptoMapName.get(value);
        }
        return undefined;
    }

    parseToIds(cryptos: Array<string>): Array<string> {
        const ids: Array<string> = [];
        cryptos.forEach(c => {
            const id = this.getCryptoId(c)
            if (id != undefined) {
                ids.push(id)
            }
        })
        return ids
    }
}

export default new Coingecko()