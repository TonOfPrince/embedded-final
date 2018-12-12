import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {action, extendObservable} from 'mobx';
import _ from 'lodash';
import styles from './home.module.css';
import {PhotosView} from './subcomponents/photos.component';
import {StocksView} from './subcomponents/stocks.component';
import {WeatherView} from './subcomponents/weather.component';

const Home = ({routingStore, stocksStore, photosStore, weatherStore}) => <div className = {styles.home}>
    <PhotosView />
    <WeatherView />
    <StocksView />
</div>;

export const HomeView = inject('routingStore', 'stocksStore', 'photosStore', 'weatherStore')(observer(Home));
