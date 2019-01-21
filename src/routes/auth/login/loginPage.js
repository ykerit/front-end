import React from 'react';
import { connect } from 'dva';
import LoginForm from './login';
import Header from '../../../components/stand-component/header'
import style from "./login.css";


function LoginPage({dispatch}) {
    function login(values) {
      dispatch({
        type: 'auth/login',
        payload: values
      })
    }
    return (
      <div className={style.content}>
        <Header/>
        <div className={style.formContent}>
          <div className={style.form}>
            <LoginForm onOk={ login }/>
          </div>
        </div>
        <div className={style.footer}>Blog ©2018 Created by yker</div>
      </div>
    );
}

export default connect()(LoginPage);
