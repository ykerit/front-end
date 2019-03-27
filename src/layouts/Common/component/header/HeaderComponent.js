import React, { Component } from 'react';
import {connect} from 'dva';
import { Icon, Menu, Dropdown, Layout } from 'antd';
import { Link } from 'dva/router';
import {getlocalStorage} from '../../../../utils/helper';
import style from './header.css';
import Logo from "../../../Sider/logo/logo";
const { Header } = Layout;

const SubMenu = Menu.SubMenu;

class HeaderComponent extends Component{
  state = {
    show: true,
  };
  constructor(props) {
    super(props);
    if (window.matchMedia("(max-width: 480px)").matches) {
      props.dispatch({
        type: 'admin/isMobile',
        payload: true,
      });
    }
  }

  componentDidMount() {
    if (this.props.is_authorization || getlocalStorage('id')) {
      this.setState({show: false})
    } else {
      this.setState({show: true})
    }
  }

  render() {
    // 未登录菜单
    const AuthMenu = (
      <SubMenu title={<span className="submenu-title-wrapper"><Icon type="idcard" />个人</span>}>
        <Menu.Item>
          <Link to="/login"><Icon type="thunderbolt"/>登录</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/register"><Icon type="user-add"/>注册</Link>
        </Menu.Item>
      </SubMenu>
    );
    // 登录后菜单
    const AdminMenu = (
      <SubMenu title={<span className="submenu-title-wrapper"><Icon type="idcard" />个人</span>}>
        <Menu.Item>
          <Link to="/admin"><Icon type="appstore"/>后台</Link>
        </Menu.Item>
      </SubMenu>
    );
    // 响应式菜单
    const DropdownMenuBar = (
      <Menu
      >
        <Menu.Item>
          <Link to="/"><Icon type="home" />首页</Link>
        </Menu.Item>
        {this.state.show ? AuthMenu : AdminMenu}
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
    );
    // 普通菜单
    const MenuBar = (
      <Menu
        mode="horizontal"
        style={{ lineHeight: '64px', fontSize: 18}}
      >
        <Menu.Item>
          <Link to="/"><Icon type="home" />首页</Link>
        </Menu.Item>
        {this.state.show ? AuthMenu : AdminMenu}
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
    );
    return (
      <Header className={style.header}>
        <Logo/>
        {
          this.props.isMobile ? (
          <Dropdown
            overlay={DropdownMenuBar}
            trigger={['click']}
          >
            <div className={style.dropDown}>
              <Icon type="bars" style={{fontSize: 24 }}/>
            </div>
          </Dropdown>) : (
            MenuBar
          )
        }
      </Header>
    );
  }
}

function mapStateToProps(state) {
  const { is_authorization } = state.auth;
  const { isMobile } = state.admin;
  return {
    is_authorization,
    isMobile
  };
}

export default connect(mapStateToProps)(HeaderComponent);
