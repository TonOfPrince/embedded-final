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
            newSymbol: "",
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
                return postData(`/api/stock/${stock}`)
                    .then(resp => this.newSymbol = "");
            }),
            removeStock: action('remove stock', stock => {
                return deleteData('/api/stock', {stock})
                    .then(resp => {});
            }),
            setNewSymbol: action('set new symbol', symbol => {this.newSymbol = symbol}),
            handleKeyPress: action ('handle key press', e => {
                if (e.key === 'Enter') {
                    this.addStock(this.newSymbol);
                }
            })

        });
    }
}
