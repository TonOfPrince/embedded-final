import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {action, extendObservable} from 'mobx';
import _ from 'lodash';
import styles from '../header.module.css';

const Logo = ({routingStore}) => <div className = {styles.logo}>
    Welcome to Home Hub!
</div>;

export const LogoView = inject('routingStore')(observer(Logo));
