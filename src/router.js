import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { AuthorizedRoute } from './routes/AuthorizedRoute';
import IndexPage from './routes/index/IndexPage';
import AdminPage from './routes/admin/adminPage';
import LoginPage from './routes/auth/loginPage';
import ArticleContent from './components/article/article-content'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <AuthorizedRoute path="/admins" exact component={AdminPage} />
        <Route path="/admin" exact component={AdminPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/article" exact component={ArticleContent}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
