import React, { Component } from 'react';
import {
  Menu, Icon
} from 'antd';
import { connect } from 'dva';
const SubMenu = Menu.SubMenu;

class Menus extends Component{

  menuSourceByadmin = [{
    key: 'personal-center',
    type: 'user',
    name: '个人中心',
    child: null
  },{
    key: 'user-management',
    type: 'team',
    name: '用户管理',
    child: [{
      key: 'admin',
      type: 'contacts',
      name: '管理员管理'
    },{
      key: 'user',
      type: 'user',
      name: '用户管理'
    },{
      key: 'role',
      type: 'man',
      name: '角色管理'
    }]
  },{
    key: 'article',
    type: 'profile',
    name: '文章管理',
    child: null
  },{
    key: 'permission',
    type: 'warning',
    name: '权限管理',
    child: null
  },{
    key: 'kind',
    type: 'database',
    name: '分类管理',
    child: null
  },{
    key: 'log',
    type: 'info-circle',
    name: '日志管理',
    child: [{
      key: 'admin-log',
      type: 'user',
      name: '管理员日志'
    },{
      key: 'user-log',
      type: 'team',
      name: '用户日志'
    },{
      key: 'tool',
      type: 'tool',
      name: '操作日志'
    }]
  },{
    key: 'user-analysis',
    type: 'bar-chart',
    name: '用户分析',
    child: null
  }];

  menuSourceByUser = [{
    key: 'personal-center',
    type: 'user',
    name: '个人中心',
    child: null
  },{
    key: 'article',
    type: 'profile',
    name: '文章管理',
    child: null
  },{
    key: 'kind',
    type: 'database',
    name: '分类管理',
    child: null
  },{
    key: 'user-analysis',
    type: 'bar-chart',
    name: '用户分析',
    child: null
  }];

  _renderChild = (child) => {
    let temp = [];
    for (let item of child){
      temp.push(
        <Menu.Item key={item.key}>
          <Icon type={item.type} />
          <span style={{ textAlign: 'center' }}>{item.name}</span>
        </Menu.Item>
      );
    }
    return temp;
  };
  renderItem = () =>{
    let temp = [];
    let data;
    if (this.props.role === 1) {
      data = this.menuSourceByadmin;
    } else {
      data = this.menuSourceByUser;
    }
    for (let item of data){
      if (item.child === null){
        temp.push(
          <Menu.Item key={item.key}>
            <Icon type={item.type} />
            <span style={{ textAlign: 'center' }}>{item.name}</span>
          </Menu.Item>
        );
      } else {
        temp.push(
          <SubMenu key={item.key} title={<span><Icon type={item.type} /><span>{item.name}</span></span>}>
            {this._renderChild(item.child)}
          </SubMenu>
        );
      }
    }
    return temp;
  };

  render(){
    const { selectedKey } = this.props;
    return (
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={['personal-center']}
        onClick={key => selectedKey(key)}
      >
        {this.renderItem()}
      </Menu>
    );
  }
}
function mapStateToProps(state) {
  const { role } = state.auth;
  return {
    role
  };
}

export default connect(mapStateToProps)(Menus);
