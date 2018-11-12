/* eslint-disable radix */
import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Icon, Avatar, Badge } from 'antd';
import UserInfo from '../../components/user-info';
import UserManage from '../../components/user-manage';
import ArticeManage from '../../components/article/article-manage';
import style from './adminPage.css';


const { Sider } = Layout;


function AdminPage({ dispatch,chooseMenu }) {
  function changeChoose(key) {
    dispatch({
      type: 'admin/changeChoose',
      payload: key.key,
    })
    dispatch({
      type: 'article/reflash_display',
      payload:false
    })
  }
  function renderComponent(key) {
    const choose = parseInt(key);

    switch (choose) {
      case 1:
        return <UserInfo/>
      case 2:
        return <UserManage/>
      case 3:
        return <ArticeManage/>
      case 4:
        return "用户分析"
      default:
        break;
    }
  }
  return (
    <div className={style.container}>
      <div className={style.header}>
        <span className={style.header_name}>Bolg后台系统</span>
        <div className={style.user}>
          <Avatar size="large" icon="user"/>
          <Icon type="bell" className={style.icon}/>
          <Badge overflowCount={999}>
            <Icon type="message" className={style.icon}/>
          </Badge>
          <Icon type="poweroff" className={style.icon}/>
        </div>
      </div>
      <div className={style.main}>
      <Layout style={{height: '100%'}}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{background: '#f7f1e3'}}>
        <Menu theme="light" mode="inline"
          onClick={key => { changeChoose(key) }} 
        >
        <Menu.Item key="1">
          <Icon type="user" />
          <span style={{ textAlign: 'center' }}>个人中心</span>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="video-camera" />
          <span style={{ textAlign: 'center' }}>用户管理</span>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="upload" />
          <span style={{ textAlign: 'center' }}>文章管理</span>
        </Menu.Item>
        <Menu.Item key="4">
          <Icon type="user" />
          <span style={{ textAlign: 'center' }}>用户分析</span>
        </Menu.Item>
      </Menu>
      </Sider>
        <div className={style.content}>
          { renderComponent(chooseMenu) }
        </div>
      </Layout>
      </div>
      <div className={style.footer}>Blog ©2018 Created by yker</div>
    </div>
  );
}

AdminPage.propTypes = {
};

function mapStateToProps(state) {
  const { chooseMenu } = state.admin;
  return {
    chooseMenu,
  };
}

export default connect(mapStateToProps)(AdminPage);
