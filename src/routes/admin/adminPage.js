/* eslint-disable radix */
import  React, { Component } from 'react';
import { connect } from 'dva';
import { Layout, Menu, Icon, Avatar, Badge } from 'antd';
import UserInfo from '../../components/user-info';
import UserManage from '../../components/user/user-manage';
import AdminManage from '../../components/user/admin-manage';
import RoleManage from '../../components/user/role-manage';
import ArticeManage from '../../components/article/article-manage';

import style from './adminPage.css';
const { Sider } = Layout;

class AdminPage extends Component{
  state = {
    chooseMenu: null,
  };
  getUserList = (dispatch) => {
    dispatch({
      type: 'auth/queryUsers',
    })
  };

  getRoleList = (dispatch) => {
    dispatch({
      type: 'auth/queryRoles',
    })
  };

  getAdminList = (dispatch) => {
    dispatch({
      type: 'auth/queryAdmins',
    })
  };
  getArticleList = (dispatch) => {
    dispatch({
      type: 'article/queryAllArticle',
      payload: 0
    })
  };

  logout = (dispatch) => {
    dispatch({
      type: 'auth/logout'
    })
  };

  renderComponent = (key, dispatch) => {
    const choose = parseInt(key);
    switch (choose) {
      case 1:
        return <UserInfo/>;
      case 3:
        this.getArticleList(dispatch);
        return <ArticeManage/>;
      case 4:
        return "用户分析";
      case 5:
        this.getAdminList(dispatch);
        return <AdminManage/>;
      case 6:
        this.getUserList(dispatch);
        return <UserManage/>;
      case 7:
        this.getRoleList(dispatch);
        return <RoleManage/>;
      case 8:
        return <h1>权限管理</h1>;
      case 10:
        return <h1>管理员日志</h1>;
      case 11:
        return <h1>用户日志</h1>;
      case 12:
        return <h1>操作日志</h1>;
      default:
        break;
    }
  };

  render(){
    const SubMenu = Menu.SubMenu;
    const { dispatch } = this.props;
    return (
      <div className={style.container}>
        <div className={style.header}>
          <img src={require('../../assets/logo.png')}  style={{ marginLeft: 10, height:45, width:60 }} alt=''/>
          <span className={style.header_name}>Bolg后台系统</span>
          <div className={style.user}>
            <Avatar size="large" icon="user"/>
            <Icon type="bell" className={style.icon} onClick={() => {}}/>
            <Badge overflowCount={999}>
              <Icon type="message" className={style.icon} onClick={() => {}}/>
            </Badge>
            <Icon type="poweroff" className={style.icon} onClick={() => this.logout(dispatch)}/>
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

export default connect()(AdminPage);
