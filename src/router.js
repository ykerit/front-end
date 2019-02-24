import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { AuthorizedRoute } from './routes/AuthorizedRoute';
import IndexPage from './routes/index/IndexPage';
import AdminPage from './routes/admin/adminPage';
import LoginPage from './routes/auth/login/loginPage';
import RegisterPage from './routes/auth/register/registerPage';
import MdeEditorPage from './routes/mdeditor/mdeditor';
import ArticleContent from './components/article/article-content/article-content';
import Test from './routes/test'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <AuthorizedRoute path="/admin" exact component={AdminPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/register" exact component={RegisterPage}/>
        <Route path="/article/:id" exact component={ArticleContent}/>
        <AuthorizedRoute path="/mdeditor" exact component={MdeEditorPage}/>
        <Route path="/test" exact component={Test}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
