import React from 'react';
import { connect } from 'dva';
import LoginForm from './login';
import UserLayout from '../../../layout/UserLayout/UserLayout'


function LoginPage({dispatch}) {
    function login(values) {
      dispatch({
        type: 'auth/login',
        payload: values
      })
    }
    return (
      <UserLayout>
        <LoginForm onOk={ login }/>
      </UserLayout>
    );
}

export default connect()(LoginPage);
