import React, {Component} from 'react';
import { Layout } from 'antd';
import Logo from './logo/logo'
import Personal from '../personal/personal'
import style from './index.css'
const { Header } = Layout;

// 页眉
export default class Headers extends Component{

    render() {
      return (
        <Header className={style.header}>
          <Logo/>
          <Personal/>
        </Header>
      );
  }
}
