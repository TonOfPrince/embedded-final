import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {computed, action, extendObservable } from 'mobx';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import _ from 'lodash';
import styles from '../article.module.css';

const Reveal = ({articlesStore}) => <div className = {styles.readMoreContainer}>
    <div className = {styles.line}></div>
    <div
        className = {styles.button}
        onClick = {articlesStore.fakeOut}
    >
        Read More
    </div>
    <div className = {styles.line}></div>
</div>;

export const RevealView = inject('articlesStore')(withRouter(observer(Reveal)));
