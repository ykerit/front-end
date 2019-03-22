import React from 'react';
import { connect } from 'dva';
import RegistrationForm from './register';
import CommonFrame from '../../../layout/common/common-frame'
import style from './register.css';


function RegisterPage({dispatch}) {
  function register(values) {
    dispatch({
      type: 'auth/register',
      payload: values
    })
  }
  return (
    <CommonFrame ourStyle={style.content}>
      <RegistrationForm onOk={ register } />
    </CommonFrame>
  );
}

export default connect()(RegisterPage);
