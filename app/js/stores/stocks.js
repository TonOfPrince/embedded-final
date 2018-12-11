import { computed, action, extendObservable } from 'mobx';
import {fetchData, postData} from '../utils/fetch';
import moment from 'moment';

export class Stock {
    constructor(stock) {
        extendObservable(this, {
            price: _.get(stock, 'iexRealtimePrice', ''),
            symbol: _.get(stock, 'symbol', ''),
            companyName: _.get(stock, 'companyName', ''),
            // intro: _.get(stock, 'intro', ''),
            // setTitle: action('set title', title => this.title = title),
            // setImage: action('set img', img => this.img = img),
            // setIntro: action('set intro', intro => this.intro = intro),
            // setTopic: action('set topic', topic => this.topic = topic),
        });
    }
}


export class StocksStore {
    constructor({routingStore}) {
        extendObservable(this, {
            stocks: [],
            temperature: "",
            currentArticle: new Article(),
            isLoading: false,
            getStocks: action('get stocks', () => {
                this.isLoading = true;
                return fetchData(`/api/stocks`)
                    .then(stocks => {
                        _.foreach(stocks, stock => {
                            stocks.push(new Stock(stock));
                        });
                    });
            }),
            addStock: action('add stock', stock => {
                return postData('/api/add_stock', {stock})
                    .then(resp => {});
            }),
            removeStock: remove('remove stock', stock => {
                return postData('/api/remove_stock', {stock})
                    .then(resp => {});
            }),

        });
    }
}
