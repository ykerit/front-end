/* eslint-disable radix */
import  React, { Component } from 'react';
import { connect } from 'dva';
import { Layout, Menu, Icon, Avatar, Badge } from 'antd';
import UserInfo from '../../components/user-info';
import UserManage from '../../components/user/user-manage';
import AdminManage from '../../components/user/admin-manage';
import RoleManage from '../../components/user/role-manage';
import ArticeManage from '../../components/article/article-manage';
import KindManage from '../../components/kind/kind-manage'
import TagManage from '../../components/tags/tag-manage'
import AdminLog from '../../components/logger/admin-log';
import UserLog from '../../components/logger/user-log';
import OpLog from '../../components/logger/op-log';
import PermissionManage from '../../components/permission/permission-manage';
import { getlocalStorage } from '../../utils/helper';

import style from './adminPage.css';
const { Sider } = Layout;

class AdminPage extends Component{
  state = {
    chooseMenu: null,
  };

  logout = (dispatch) => {
    dispatch({
      type: 'auth/logout'
    });
  };
  renderName = (name, is_authorization) => {
    if (getlocalStorage('name') !== null || is_authorization){
      return 'Hi! ' + getlocalStorage('name');
    } else if (name !== null){
      return 'Hi! ' + name;
    }
    return '未登录'
  };
  renderComponent = (key, dispatch) => {
    const choose = parseInt(key);
    switch (choose) {
      case 1:
        return <UserInfo/>;
      case 3:
        return <ArticeManage/>;
      case 4:
        return "用户分析";
      case 5:
        return <AdminManage/>;
      case 6:
        return <UserManage/>;
      case 7:
        return <RoleManage/>;
      case 8:
        return <PermissionManage/>;
      case 10:
        return <AdminLog/>;
      case 11:
        return <UserLog/>;
      case 12:
        return <OpLog/>;
      case 13:
        return <KindManage/>;
      case 14:
        return <TagManage/>;
      default:
        break;
    }
  };

  render(){
    const SubMenu = Menu.SubMenu;
    const { dispatch, name, is_authorization } = this.props;
    return (
      <div className={style.container}>
        <div className={style.header}>
          <img src={require('../../assets/logo.png')}  style={{ marginLeft: 10, height:45, width:60 }} alt=''/>
          <span className={style.header_name}>Bolg后台系统</span>
          <div className={style.user}>
            <Avatar size="large" icon="user"/>
            <span style={{ marginLeft: 5 }}>{this.renderName(name, is_authorization)}</span>
            <Icon type="bell" className={style.icon} onClick={() => {}}/>
            <Badge overflowCount={999}>
              <Icon type="message" className={style.icon} onClick={() => {}}/>
            </Badge>
            <Icon type="poweroff" className={style.icon} onClick={() => this.logout(dispatch, is_authorization)}/>
          </div>
        </div>
        <div className={style.main}>
          <Layout style={{height: '100%'}}>
            <Sider
              breakpoint="lg"
              collapsedWidth="0"
              style={{background: '#f7f1e3'}}>
              <Menu theme="light" mode="inline"
                    onClick={key => this.setState({ chooseMenu: key.key })}
              >
                <Menu.Item key="1">
                  <Icon type="user" />
                  <span style={{ textAlign: 'center' }}>个人中心</span>
                </Menu.Item>
                <SubMenu key="2" title={<span><Icon type="video-camera" /><span>用户管理</span></span>}>
                  <Menu.Item key="5">管理员管理</Menu.Item>
                  <Menu.Item key="6">用户管理</Menu.Item>
                  <Menu.Item key="7">角色管理</Menu.Item>
                </SubMenu>
                <Menu.Item key="3">
                  <Icon type="upload" />
                  <span style={{ textAlign: 'center' }}>文章管理</span>
                </Menu.Item>
                <Menu.Item key="8">
                  <Icon type="upload" />
                  <span style={{ textAlign: 'center' }}>权限管理</span>
                </Menu.Item>
                <Menu.Item key="13">
                  <Icon type="upload" />
                  <span style={{ textAlign: 'center' }}>分类管理</span>
                </Menu.Item>
                <Menu.Item key="14">
                  <Icon type="upload" />
                  <span style={{ textAlign: 'center' }}>标签管理</span>
                </Menu.Item>
                <SubMenu key="9" title={<span><Icon type="video-camera" /><span>日志管理</span></span>}>
                  <Menu.Item key="10">管理员日志</Menu.Item>
                  <Menu.Item key="11">用户日志</Menu.Item>
                  <Menu.Item key="12">操作日志</Menu.Item>
                </SubMenu>
                <Menu.Item key="4">
                  <Icon type="user" />
                  <span style={{ textAlign: 'center' }}>用户分析</span>
                </Menu.Item>
              </Menu>
            </Sider>
            <div className={style.content}>
              { this.renderComponent(this.state.chooseMenu, dispatch) }
            </div>
          </Layout>
        </div>
        <div className={style.footer}>Blog ©2018 Created by yker</div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { name, is_authorization } = state.auth;
  return {
    name,
    is_authorization
  };
}
export default connect(mapStateToProps)(AdminPage);
