import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/index/IndexPage';
import AdminPage from './routes/admin/adminPage';
import LoginPage from './routes/auth/loginPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/admin" exact component={AdminPage} />
        <Route path="/login" exact component={LoginPage} />        
      </Switch>
    </Router>
  );
}

export default RouterConfig;
