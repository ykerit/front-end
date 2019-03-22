import React, { Component } from 'react';
import { Layout } from 'antd';
import Header from '../../components/stand-component/header';
const { Content, Footer } = Layout;

export default class CommonFrame extends Component{
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header/>
        <Content className={this.props.ourStyle}>
            {this.props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          yker ©2019 Created by school
        </Footer>
      </Layout>
    );
  }
}
