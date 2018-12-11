import React, {Component} from 'react';
import {Provider, inject, observer} from 'mobx-react';
import {computed, action, extendObservable } from 'mobx';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import _ from 'lodash';
import {FakedOutView} from './subcomponents/fakedout.component';
import {RevealView} from './subcomponents/reveal.component';
import styles from './article.module.css';

const Article = ({match, articlesStore}) => {
    let article = articlesStore.currentArticle;
    return <div className = {styles.article}>
        <img className = {styles.fakeOutBlank} src = '../../../../dist/images/faked_out.png' />
        <div className = {styles.imageContainer}>
            <img
                className = {styles.image}
                src = {article.img}
            />
        </div>
        <div className = {styles.title}>
            {article.title}
        </div>
        <div className = {styles.intro}>
            {article.intro}...
        </div>
        {
            articlesStore.fakedOut ?
                <FakedOutView /> :
                <RevealView />
        }
    </div>
};

export const ArticleView = inject('articlesStore')(withRouter(observer(Article)));
