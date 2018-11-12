import React from 'react';
import { connect } from 'dva';
import LoginForm from './login';


function LoginPage({dispatch,token, message, isLogined}) {
    function login(values) {
      dispatch({
        type: 'auth/login',
        payload: values
      })
      link();
    }
    function link() {
      dispatch({
        type: 'auth/link'
      })
    }

    return (
      <LoginForm onOk={ login } />
    );
}

function mapStateToProps(state) {
    const { token, isLogined, message } = state.auth;
    console.log('state:', state.auth);
    return {
      token,
      isLogined,
      message,
    };
  }

export default connect(mapStateToProps)(LoginPage);