import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {action, extendObservable} from 'mobx';
import _ from 'lodash';
import styles from '../home.module.css';

const Stocks = ({routingStore, stocksStore}) => <div className = {styles.stocks}>
    <div>
        <div className = {styles.title}>STOCKS</div>
        <input
            placeholder = "symbol"
            value = {stocksStore.newSymbol}
            className = {styles.input}
            onChange = {e => stocksStore.setNewSymbol(e.target.value)}
            onKeyPress={e => stocksStore.handleKeyPress(e)}
        />
    </div>
    {stocksStore.err ? <div className = {styles.err}>{stocksStore.err}</div> : ""}
    {
        _.map(stocksStore.stocks, ({symbol, companyName, latestPrice, change, changePercent, pos}) => {
            return <div className = {styles.stock}>
                <div className = {styles.remove} onClick = {() => stocksStore.removeStock(symbol)}>X</div>
                <div className = {styles.stockInfo}>
                    <div className = {styles.name}>
                        <div className = {styles.company}>{companyName} ({symbol})</div>
                    </div>
                    <div className = {styles.price}>{latestPrice}</div>
                    <div className = {pos ? styles.pos : styles.neg}>{change}</div>
                    <div className = {pos ? styles.pos : styles.neg}>{changePercent}</div>
                </div>
            </div>;
        })
    }

</div>;

export const StocksView = inject('routingStore', 'stocksStore')(observer(Stocks));
