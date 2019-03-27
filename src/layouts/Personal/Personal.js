import React, {Component} from 'react';
import { Avatar, Icon, Badge, Menu, Dropdown} from 'antd';
import {connect} from 'dva'
import { routerRedux } from 'dva/router';
import {getlocalStorage} from "../../utils/helper";
import style from './Personal.css'

function logout(dispatch) {
  dispatch({
    type: 'auth/logout'
  });
}

function backHome(dispatch) {
  dispatch(routerRedux.push('/'))
}

function _renderName(name, is_authorization) {
  if (getlocalStorage('name') !== null && is_authorization){
    return 'Hi! ' + getlocalStorage('name');
  } else if (name !== null){
    return 'Hi! ' + name;
  }
  return '未登录'
}

class Personal extends Component{
  componentDidMount() {
    if (getlocalStorage('name') !== null || this.props.is_authorization) {
      this.props.dispatch({
        type: 'auth/queryUserInfo',
        payload: getlocalStorage('id')
      })
    }
  }

  selectMenu = ({ key }) => {
    if (key === 'UserSetting' || key === 'UserCenter') {
      this.props.dispatch({
        type: 'admin/selectMenu',
        payload: key
      });
      this.props.dispatch({
        type: 'admin/openSelectKey',
        payload: 'Account'
      });
    }
  };

  render() {
    const { face, name, is_authorization, dispatch, isMobile } = this.props;
    const DropdownList = (
      <Menu
        onClick={this.selectMenu}
      >
        <Menu.Item key='user'>
          <Icon type='user'/>
          {_renderName(name, is_authorization)}
        </Menu.Item>
        <Menu.Item
          key='home'
          onClick={() => backHome(dispatch)}
        >
          <Icon type="home" />首页
        </Menu.Item>
        <Menu.Item
          key='UserCenter'
        >
          <Icon type='edit'/>
          个人中心
        </Menu.Item>
        <Menu.Item
          key='UserSetting'
        >
          <Icon type='setting'/>
          个人设置
        </Menu.Item>
        <Menu.Item
          key='logout'
          onClick={() => logout(dispatch)}
        >
          <Icon type='logout'/>
          退出登录
        </Menu.Item>
      </Menu>
    );

    return (
      <div className={style.content}>
        <div className={style.news}>
          <Badge count={6}>
            <Icon
              style={{fontSize:'20px'}}
              type="bell"
            />
          </Badge>
        </div>
        <div className={style.dropDown}>
          <Dropdown
            overlay={DropdownList}
            trigger={[isMobile ? 'click' : 'hover']}
          >
            <div>
              <Avatar
                size='large'
                src={face}
              />
              <Icon
                style={{color:'rgba(0,0,0,.3)'}}
                type="caret-down"
              />
            </div>
          </Dropdown>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { name, is_authorization, face } = state.auth;
  const { collapse, isMobile } = state.admin;
  return {
    name,
    is_authorization,
    face,
    collapse,
    isMobile
  };
}

export default connect(mapStateToProps)(Personal);
