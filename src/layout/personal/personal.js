import React, {Component} from 'react';
import { Avatar, Icon, Badge, Menu, Dropdown} from 'antd';
import {connect} from 'dva'
import { routerRedux } from 'dva/router';
import {getlocalStorage} from "../../utils/helper";
import style from './personal.css'

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

  render() {
    const { face, name, is_authorization, dispatch } = this.props;
    const DropdownList = (
      <Menu>
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
          disabled
          key='edit'
        >
          <Icon type='edit'/>
          个人设置
        </Menu.Item>
        <Menu.Item
          disabled
          key='setting'
        >
          <Icon type='setting'/>
          系统设置
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
          >
            <div>
              <Avatar
                size='large'
                src={face}
              />
              <Icon style={{color:'rgba(0,0,0,.3)'}}
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
  const { collapse } = state.admin;
  return {
    name,
    is_authorization,
    face,
    collapse
  };
}

export default connect(mapStateToProps)(Personal);
