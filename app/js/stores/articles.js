import { computed, action, extendObservable } from 'mobx';
import {fetchData, postData} from '../utils/fetch';
import moment from 'moment';

export class Article {
    constructor(article) {
        extendObservable(this, {
            img: _.get(article, 'img', ''),
            title: _.get(article, 'title', ''),
            topic: _.get(article, 'topic', ''),
            intro: _.get(article, 'intro', ''),
            articleId: _.get(article, 'articleid', ''),
            updatedDate: moment(_.get(article, 'updated_at', '')).format('MMMM Do YYYY'),
            setTitle: action('set title', title => this.title = title),
            setImage: action('set img', img => this.img = img),
            setIntro: action('set intro', intro => this.intro = intro),
            setTopic: action('set topic', topic => this.topic = topic),
        });
    }
}

export class ArticlesStore {
    constructor({routingStore}) {
        extendObservable(this, {
            articles: [],
            currentArticle: new Article(),
            isLoading: false,
            getArticle: action('get article', id => {
                this.isLoading = true;
                return fetchData(`/api/articles/${id}`)
                    .then(article => {
                        this.currentArticle =  new Article(article);
                        this.isLoading = false;
                    });
            }),

            getArticles: action('get articles', () => {
                this.isLoading = true;
                return fetchData(`/api/articles`)
                    .then(articles => {
                        this.articles = _.map(articles, article => new Article(article));
                        this.isLoading = false;
                    });
            }),
            setCurrentArticle: action('set current article', id => {
                let article = _.find(this.articles, article => article.articleId === id)
                if (article) {
                    // this.currentArticle = article;
                    this.currentArticle = article;
                } else {
                    return this.getArticle(id);
                }
            }),
            createFake: action('create fake', () => {
                return postData('/api/articles', {
                    title: this.currentArticle.title,
                    img: this.currentArticle.img,
                    intro: this.currentArticle.intro,
                    topic: this.currentArticle.topic,
                })
                    .then(article => {
                        this.fakedOut = false;
                        this.makingFake = false;
                        routingStore.push(`/article/${article.articleid}`)
                    })
                    .then(this.getArticles);
            }),
            fakedOut: false,
            fakeOut: action('fake out', () => {
                this.fakedOut = true;
            }),
            makingFake: false,
            makeFake: action('make fake', () => this.makingFake = true),
        });
    }
}
