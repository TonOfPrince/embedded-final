import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {action, extendObservable} from 'mobx';
import {LogoView} from './subcomponents/logo.component';
import _ from 'lodash';
import styles from './header.module.css';

const Header = ({routingStore}) => <div
    className = {styles.header}
    onClick = {() => routingStore.push(`/`)}
>
    <LogoView />
</div>;

export const HeaderView = inject('routingStore')(observer(Header));
