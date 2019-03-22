import React from 'react';
import style from './logo.css';
import logo from '../../../assets/logo.jpg';

export default function Logo() {
  return (
    <div className={style.logo}>
      <img src={logo} alt="logo" />
      <h1>Trace Back</h1>
    </div>
  );
}
