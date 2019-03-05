import React, {Component} from 'react';
import { Avatar, Icon, Badge } from 'antd';
import {connect} from 'dva'
import style from './personal.css'
import {getlocalStorage} from "../../utils/helper";

function logout(dispatch) {
  dispatch({
    type: 'auth/logout'
  });
}

function _renderName(name, is_authorization) {
  if (getlocalStorage('name') !== null || is_authorization){
    return 'Hi! ' + getlocalStorage('name');
  } else if (name !== null){
    return 'Hi! ' + name;
  }
  return '未登录'
}

class Personal extends Component{
  render() {
    const { image_url, name, is_authorization, dispatch } = this.props;
    return (
      <div className={style.container}>
        <Avatar size="large" icon="user" src={image_url}/>
        <span>{_renderName(name, is_authorization)}</span>
        <span><Icon type="bell" onClick={() => {}}/></span>
        <span>
        <Badge overflowCount={999}>
        <Icon type="message"/>
      </Badge>
      </span>
        <span><Icon type="poweroff" onClick={() => logout(dispatch)}/></span>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { name, is_authorization, image_url } = state.auth;
  return {
    name,
    is_authorization,
    image_url
  };
}

export default connect(mapStateToProps)(Personal);
