import React from 'react';
import style from './logo.css';

export default function Logo() {
  return (
    <div className={style.logo}>
      <img src={require('../../../assets/logo.jpg')} alt="logo" />
      <h1>Trace Back</h1>
    </div>
  );
}
