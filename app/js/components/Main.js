import React, {Component} from 'react';
import {render} from 'react-dom';
import {
  Router,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom';
import {Provider} from 'mobx-react';
import {breakpoints} from '../stores/breakpoints';
import {HeaderView} from './header/header.component';
import {HomeView} from './home/home.component';
import {ArticleView} from './article/article.component';
import {ArticlesStore} from '../stores/articles';
import {MatchMediaProvider} from 'mobx-react-matchmedia';
import {RouterStore, syncHistoryWithStore} from 'mobx-react-router';
import createBrowserHistory from 'history/createBrowserHistory';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();

let articlesStore = new ArticlesStore({routingStore});
articlesStore.getArticles()

let stores = {
    routingStore,
    articlesStore,
};

const history = syncHistoryWithStore(browserHistory, routingStore);

const PrivateRoute = props => {
    let Component = props.component;
    let rest = _.omit(props, ['component']);
    return <Route
        {...rest}
        render = {props =>
            authStore.isAuthenticated ?
                <Component {...props}/> :
                <Redirect to = {{
                        pathname: '/login',
                        state: {from: props.location}
                    }}
                />
        }
    />;
};

const Main = props => <Provider {...stores}>
    <MatchMediaProvider breakpoints = {breakpoints}>
        <Router history = {history}>
            <div style = {{display: 'flex', justifyContent: 'spaceAround', alignItems: 'center', flexDirection: 'column'}}>
                <HeaderView />
                <Switch>
                    <Route path = '/article/:uid' render = {({match, location}) =>{
                        let articleId = _.get(match, 'params.uid');
                        articlesStore.setCurrentArticle(articleId)
                        if (articleId) {
                            return <ArticleView />
                        } else {
                            return <Redirect to = {{
                                pathname: '/',
                                state: {from: location}
                            }}/>
                        }
                    }} />
                    <Route path = '/' component = {HomeView} />
                </Switch>
            </div>
        </Router>
    </MatchMediaProvider>
</Provider>;

render((<Main />), document.getElementById('app'));
