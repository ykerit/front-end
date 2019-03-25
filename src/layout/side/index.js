import React, { Component } from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import Menus from './menu'
import {selectTagList} from './tag-list'
import Logo from './logo/logo';
import style from './index.css'
const { Sider } = Layout;

class Side extends Component{
  state={
    breaks: false,
    collapse: false,
  };
  // 断点触发
  onBreakpoint = (breaks) => {
    this.setState({breaks: breaks});
    this.props.dispatch({
      type: 'admin/toggle',
      payload: breaks
    })
  };

  render(){
    const { selectedKey, role, collapse} = this.props;

    return (
      <Sider
        collapsible
        collapsed={collapse}
        theme="light"
        breakpoint="md"
        onBreakpoint={(bool) => this.onBreakpoint(bool)}
        trigger={null}
        collapsedWidth={this.state.breaks ? 0 : 80}
        className={style.side}
      >
        <Logo collapse={collapse}/>
        <Menus selectedKey={selectedKey} menus={selectTagList(role)}/>
      </Sider>
    );
  }
}

function mapStateToProps(state) {
  const { role } = state.auth;
  const { collapse } = state.admin;
  return {
    role,
    collapse
  };
}

export default connect(mapStateToProps)(Side);
