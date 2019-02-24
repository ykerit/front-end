import React, { Component } from 'react';
import {
  Layout
} from 'antd';
import Menus from './menu'
import style from './index.css'
const { Sider } = Layout;

export default class Side extends Component{
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render(){
    const { selectedKey } = this.props;
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        theme="light"
        className={style.side}
      >
        <Menus selectedKey={selectedKey}/>
      </Sider>
    );
  }
}
