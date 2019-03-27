import React from 'react';
import style from './logo.css';
import logo from '../../../assets/logo.jpg';

export default function Logo({collapse}) {
  if (collapse) {
    return (
      <div className={style.logo}>
        <img src={logo} alt="logo" />
      </div>
    );
  } else {
    return (
      <div className={style.logo}>
        <img src={logo} alt="logo" />
        <h1>Trace Back</h1>
      </div>
    );
  }
}
