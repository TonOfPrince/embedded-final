import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {action, extendObservable} from 'mobx';
import _ from 'lodash';
import styles from './home.module.css';

const Home = ({routingStore, stocksStore, photosStore, weatherStore}) => <div>
    <div>
        <div>PHOTOS</div>
        <input type="file" name="myImage" onChange= {photosStore.addFile} />
        <div onClick = {photosStore.uploadFile}>UPLOAD</div>
        {
            _.map(photosStore.photos, photo => <img className = {styles.fakeOutBlank} src = {`../../../../photos/${photo}`} />)
        }
    </div>
    <div>
        <div>WEATHER</div>
        <input
            placeholder = "city"
            value = {weatherStore.newCity}
            className = {styles.input}
            onChange = {e => weatherStore.setNewCity(e.target.value)}
            onKeyPress={e => weatherStore.handleKeyPress(e)}
        />
        {weatherStore.city ? <div>City: {weatherStore.city}</div> : ""}
        {weatherStore.city && weatherStore.temp ? <div>Temperature: {weatherStore.temp}</div> : ""}
        {weatherStore.city && weatherStore.high ? <div>High: {weatherStore.high}</div> : ""}
        {weatherStore.city && weatherStore.low ? <div>Low: {weatherStore.low}</div> : ""}
        {weatherStore.city && weatherStore.description ? <div>Description: {weatherStore.description}</div> : ""}
    </div>
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

export const HomeView = inject('routingStore', 'stocksStore', 'photosStore', 'weatherStore')(observer(Home));
