import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {computed, action, extendObservable } from 'mobx';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import _ from 'lodash';
import styles from '../article.module.css';
// import fakedOut from '../../../images/faked_out.png';

const FakedOut = ({articlesStore}) => <div className = {styles.fakeOutContainer}>
    <img className = {styles.fakeOut} src = '../../../../../dist/images/faked_out.png' />
    <div className = {styles.newArticle}>
        <div className = {styles.fakeTitle}>Make it your own fake!</div>
        <div className = {styles.label}>Title</div>
        <input
            placeholder = "title"
            value = {articlesStore.currentArticle.title}
            className = {styles.input}
            onChange = {e => articlesStore.currentArticle.setTitle(e.target.value)}
        />
        <div className = {styles.label}>Image Link</div>
        <input
            placeholder = "image url"
            value = {articlesStore.currentArticle.img}
            className = {styles.input}
            onChange = {e => articlesStore.currentArticle.setImage(e.target.value)}
        />
        <div className = {styles.label}>Intro Line</div>
        <textarea
            placeholder = "intro"
            value = {articlesStore.currentArticle.intro}
            className = {styles.input}
            onChange = {e => articlesStore.currentArticle.setIntro(e.target.value)}
        />
        <div className = {styles.label}>Topic</div>
        <select
            placeholder = "topic"
            value = {articlesStore.currentArticle.topic}
            className = {styles.input}
            onChange = {e => articlesStore.currentArticle.setTopic(e.target.value)}
        >
            <option value = "World">World</option>
            <option value = "US">U.S</option>
            <option value = "Politics">Politics</option>
            <option value = "Business">Business</option>
            <option value = "Opinion">Opinion</option>
            <option value = "Technology">Technology</option>
            <option value = "Science">Science</option>
            <option value = "Health">Health</option>
            <option value = "Sports">Sports</option>
        </select>
        <div className = {styles.buttons}>
            <div className = {styles.fakeButton} onClick = {articlesStore.createFake}>Create Fake</div>
        </div>
    </div>
</div>;

export const FakedOutView = inject('articlesStore')(withRouter(observer(FakedOut)));
