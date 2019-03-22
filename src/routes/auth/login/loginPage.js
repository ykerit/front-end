import React from 'react';
import { connect } from 'dva';
import LoginForm from './login';
import CommonFrame from '../../../layout/common/common-frame'
import style from "./login.css";


function LoginPage({dispatch}) {
    function login(values) {
      dispatch({
        type: 'auth/login',
        payload: values
      })
    }
    return (
      <CommonFrame ourStyle={style.content}>
        <LoginForm onOk={ login }/>
      </CommonFrame>
    );
}

export default connect()(LoginPage);
