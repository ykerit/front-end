import React from 'react';
import { connect } from 'dva';
import RegistrationForm from './register';
import UserLayout from '../../../layout/UserLayout/UserLayout'

function RegisterPage({dispatch}) {
  function register(values) {
    dispatch({
      type: 'auth/register',
      payload: values
    })
  }
  return (
    <UserLayout>
      <RegistrationForm onOk={ register } />
    </UserLayout>
  );
}

export default connect()(RegisterPage);
