import { computed, action, extendObservable } from 'mobx';
import {fetchData, postData, deleteData} from '../utils/fetch';
import moment from 'moment';

export class Stock {
    constructor(stock) {
        extendObservable(this, {
            symbol: _.get(stock, 'symbol', ''),
            companyName: _.get(stock, 'companyName', ''),
            latestPrice: _.get(stock, 'latestPrice', ''),
            change: _.get(stock, 'change', ''),
            changePercent: _.get(stock, 'changePercent', ''),
            pos: _.get(stock, 'pos', true),
        });
    }
}


export class StocksStore {
    constructor({routingStore}) {
        extendObservable(this, {
            stocks: [],
            newSymbol: "",
            err: "",
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
                if (this.stocks.length >= 5) {
                    this.err = "You have reached your limit of 5 stocks.";
                } else {
                    return postData(`/api/stock/${_.toUpper(stock)}`)
                        .then(resp => {
                            console.log(resp);
                            if (_.has(resp, "err")) {
                                this.err = resp.err;
                            } else if (_.has(resp, "symbol")) {
                                this.stocks.push(new Stock(resp));
                                this.newSymbol = "";
                                this.err = "";
                            }
                        })
                        .catch(({err}) => {
                            this.err = err;
                            console.log(err);
                        });
                }
            }),
            removeStock: action('remove stock', stock => {
                return deleteData(`/api/stock/${ _.toUpper(stock)}`)
                    .then(stocks => {
                        this.stocks = stocks
                        this.err = "";

                    })
                    .catch(({err}) => this.err = err);
            }),
            setNewSymbol: action('set new symbol', symbol => {this.newSymbol = symbol}),
            handleKeyPress: action ('handle key press', e => {
                if (e.key === 'Enter') {
                    this.addStock(this.newSymbol);
                }
            }),

        });
    }
}
