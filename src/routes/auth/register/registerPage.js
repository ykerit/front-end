import React from 'react';
import { connect } from 'dva';
import RegistrationForm from './register';
import style from './register.css';


function RegisterPage({dispatch}) {
  function register(values) {
    dispatch({
      type: 'auth/register',
      payload: values
    })
  }
  return (
    <div className={style.content}>
      <div className={style.formContent}>
        <div className={style.form}>
          <RegistrationForm onOk={ register } />
        </div>
      </div>
      <div className={style.footer}>Blog ©2018 Created by yker</div>
    </div>
  );
}

export default connect()(RegisterPage);
