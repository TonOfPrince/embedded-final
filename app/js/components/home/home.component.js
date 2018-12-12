import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {action, extendObservable} from 'mobx';
import _ from 'lodash';
import styles from './home.module.css';

const Home = ({routingStore, stocksStore, photosStore}) => <div>
    <div>PHOTOS</div>
        <input type="file" name="myImage" onChange= {photosStore.addFile} />
        <div onClick = {photosStore.uploadFile}>UPLOAD</div>
    <div>WEATHER</div>
    <div>
        <div>STOCKS</div>
        <input
            placeholder = "symbol"
            value = {stocksStore.newSymbol}
            className = {styles.input}
            onChange = {e => stocksStore.setNewSymbol(e.target.value)}
            onKeyPress={e => stocksStore.handleKeyPress(e)}
        />
    </div>
    <div>
    {
        _.map(stocksStore.stocks, ({symbol, companyName, latestPrice, change, changePercent}) => {
            return <div>
                <div>{symbol}</div>
                <div>{companyName}</div>
                <div>{latestPrice}</div>
                <div>{change}</div>
                <div>{changePercent}</div>
            </div>;
        })
    }
    </div>

</div>;

export const HomeView = inject('routingStore', 'stocksStore', 'photosStore')(observer(Home));
