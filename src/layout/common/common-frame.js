import React, { Component } from 'react';
import { Layout } from 'antd';
import HeaderComponent from './component/header/HeaderComponent';
import style from './CommonFrame.css';
const { Content, Footer } = Layout;

export default class CommonFrame extends Component{
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <HeaderComponent/>
        <Content className={style.container}>
          <div className={style.content}>
            {this.props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          yker ©2019 Created by school
        </Footer>
      </Layout>
    );
  }
}
