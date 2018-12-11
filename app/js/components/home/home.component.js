import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {action, extendObservable} from 'mobx';
import _ from 'lodash';
import styles from './home.module.css';

const Home = ({routingStore}) => <div>
    <div>PHOTOS</div>
    <div>WEATHER</div>
    <div>STOCKS</div>
</div>;

export const HomeView = inject('routingStore')(observer(Home));
