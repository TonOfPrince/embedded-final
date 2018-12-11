import { computed, action, extendObservable } from 'mobx';
import {fetchData, postData} from '../utils/fetch';
import moment from 'moment';

export class Stock {
    constructor(stock) {
        extendObservable(this, {
            symbol: _.get(stock, 'symbol', ''),
            companyName: _.get(stock, 'companyName', ''),
            latestPrice: _.get(stock, 'latestPrice', ''),
            change: _.get(stock, 'change', ''),
            changePercent: _.get(stock, 'changePercent', ''),
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
                        _.forEach(stocks, stock => {
                            this.stocks.push(new Stock(stock));
                        });
                    });
            }),
            addStock: action('add stock', stock => {
                return postData(`/api/stock/${_.toUpper(stock)}`)
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
