import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {action, extendObservable} from 'mobx';
import _ from 'lodash';
import styles from '../home.module.css';

const Weather = ({routingStore, weatherStore}) => <div className = {styles.weather}>
    <div className = {styles.title}>WEATHER</div>
    <input
        placeholder = "city"
        value = {weatherStore.newCity}
        className = {styles.input}
        onChange = {e => weatherStore.setNewCity(e.target.value)}
        onKeyPress={e => weatherStore.handleKeyPress(e)}
    />
    {weatherStore.err ? <div className = {styles.err}>{weatherStore.err}</div> : ""}
    {weatherStore.city ? <div className = {styles.city}>{weatherStore.city}</div> : ""}
    {weatherStore.city && weatherStore.description ? <div className = {styles.description}>{weatherStore.description}</div> : ""}
    {weatherStore.city && weatherStore.temp ? <div className = {styles.temp}>{weatherStore.temp}</div> : ""}
    {weatherStore.city && weatherStore.high ? <div className = {styles.extreme}>{weatherStore.high}</div> : ""}
    {weatherStore.city && weatherStore.low ? <div className = {styles.extreme}>{weatherStore.low}</div> : ""}
</div>;

export const WeatherView = inject('routingStore', 'weatherStore')(observer(Weather));
