import React, {Component} from 'react';
import { Avatar, Icon, Badge} from 'antd';
import {connect} from 'dva'
import style from './personal.css'
import {getlocalStorage} from "../../utils/helper";
import { Link } from 'dva/router';

function logout(dispatch) {
  dispatch({
    type: 'auth/logout'
  });
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
    return (
      <div className={style.container}>
        <Avatar size="large" icon="user" src={face}/>
        <span>{_renderName(name, is_authorization)}</span>
        <span><Icon type="bell" onClick={() => {}}/></span>
        <span>
          <Badge overflowCount={999}>
          <Icon type="message"/>
          </Badge>
        </span>
        <span><Icon type="poweroff" onClick={() => logout(dispatch)}/></span>
        <span><Link to="/"><Icon type="home" />首页</Link></span>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { name, is_authorization, face } = state.auth;
  return {
    name,
    is_authorization,
    face
  };
}

export default connect(mapStateToProps)(Personal);
