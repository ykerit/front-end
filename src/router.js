import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { AuthorizedRoute } from './routes/AuthorizedRoute';
import IndexPage from './routes/index/IndexPage';
import AdminPage from './routes/admin/adminPage';
import LoginPage from './routes/auth/login/loginPage';
import RegisterPage from './routes/auth/register/registerPage';
import MdeEditorPage from './routes/mdeditor/mdeditor';
import FiledPage from './routes/filed/filed-page';
import ClassificationPage from './routes/classification/classification-page'
import Tags from './routes/tags/tag-page'
import About from './routes/about/about-page'
import ArticleDetail from './routes/articleDetail/ArticleDetail';


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <AuthorizedRoute path="/admin" exact component={AdminPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/register" exact component={RegisterPage}/>
        <Route path="/article/:id" exact component={ArticleDetail}/>
        <Route path="/filed" exact component={FiledPage}/>
        <Route path="/classification" exact component={ClassificationPage}/>
        <Route path="/tags" exact component={Tags}/>
        <Route path="/about" exact component={About}/>
        <AuthorizedRoute path="/mdeditor" exact component={MdeEditorPage}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
