import React, {Component} from 'react';
import { Layout } from 'antd';
import Headers from '../header/index'
import Side from '../side/index'
import PersonalCenter from '../../components/personal-center/personal-center'
import ArticeManage from "../../components/article/article-manage";
import AdminManage from "../../components/user/admin-manage";
import UserManage from "../../components/user/user-manage";
import RoleManage from "../../components/user/role-manage";
import PermissionManage from "../../components/permission/permission-manage";
import AdminLog from "../../components/logger/admin-log";
import UserLog from "../../components/logger/user-log";
import OpLog from "../../components/logger/op-log";
import KindManage from "../../components/kind/kind-manage";
const { Content, Footer } = Layout;

// 页眉
export default class Frame extends Component{
  state = {
    key: 'personal-center',
  };
  // 菜单选择
  selectedKey = (key) => {
    this.setState({key: key.key});
  };

  // 渲染内容
  _renderContent = () => {
    switch (this.state.key) {
      case 'personal-center':
        return <PersonalCenter/>;
      case 'article':
        return <ArticeManage/>;
      case 'user-analysis':
        return "用户分析";
      case 'admin':
        return <AdminManage/>;
      case 'user':
        return <UserManage/>;
      case 'role':
        return <RoleManage/>;
      case 'permission':
        return <PermissionManage/>;
      case 'admin-log':
        return <AdminLog/>;
      case 'user-log':
        return <UserLog/>;
      case 'tool':
        return <OpLog/>;
      case 'kind':
        return <KindManage/>;
      default:
        break;
    }
  };
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Side selectedKey={this.selectedKey}/>
        <Layout>
          <Headers/>
          <Content style={{ marginTop: '20px', marginLeft: '15px', marginRight: '15px' }}>
            <div
              style={{
                padding: 24,
                height: '100%'
              }}>
              {this._renderContent()}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            yker ©2019 Created by school
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
