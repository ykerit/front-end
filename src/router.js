import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { AuthorizedRoute } from './routes/AuthorizedRoute';
import IndexPage from './routes/index/IndexPage';
import AdminPage from './routes/admin/adminPage';
import LoginPage from './routes/auth/login/loginPage';
import RegisterPage from './routes/auth/register/registerPage';
import ArticleContent from './components/article/article-content/article-content';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <AuthorizedRoute path="/admin" exact component={AdminPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/register" exact component={RegisterPage}/>
        <Route path="/article/:id" exact component={ArticleContent}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
