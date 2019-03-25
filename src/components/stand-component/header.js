import React, { Component } from 'react';
import {connect} from 'dva';
import { Icon, Menu } from 'antd';
import { Link } from 'dva/router';
import Logo from '../../layout/side/logo/logo';
import {getlocalStorage} from '../../utils/helper';

const SubMenu = Menu.SubMenu;

class Header extends Component{
  state = {
    show: true,
  };

  componentDidMount() {
    if (this.props.is_authorization || getlocalStorage('id')) {
      this.setState({show: false})
    } else {
      this.setState({show: true})
    }
  }

  renderUser = () => {
    return (
      <SubMenu title={<span className="submenu-title-wrapper"><Icon type="idcard" />个人</span>}>
        <Menu.Item>
          <Link to="/login"><Icon type="thunderbolt"/>登录</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/register"><Icon type="user-add"/>注册</Link>
        </Menu.Item>
      </SubMenu>
    );
  };

  renderPerson = () => {
    return (
      <SubMenu title={<span className="submenu-title-wrapper"><Icon type="idcard" />个人</span>}>
        <Menu.Item>
          <Link to="/admin"><Icon type="appstore"/>后台</Link>
        </Menu.Item>
      </SubMenu>
    );
  };

  render() {
    return (
      <div style={{ width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF'
      }}>
        <Logo/>
        <Menu
          mode="horizontal"
          style={{ fontSize: 18 }}
        >
          <Menu.Item>
            <Link to="/"><Icon type="home" />首页</Link>
          </Menu.Item>
          {this.state.show ? this.renderUser() : this.renderPerson()}
          <Menu.Item>
            <Link to="/classification"><Icon type="book"/>分类</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/filed"><Icon type="paper-clip"/>归档</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/tags"><Icon type="tags" />标签</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/about"><Icon type="user"/>关于</Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { is_authorization } = state.auth;
  return {
    is_authorization
  };
}

export default connect(mapStateToProps)(Header);
