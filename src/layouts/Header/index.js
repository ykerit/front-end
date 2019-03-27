import React, {Component} from 'react';
import { connect } from 'dva';
import { Layout, Icon } from 'antd';
import Personal from '../Personal/Personal'
import style from './index.css'
const { Header } = Layout;

// 页眉
class Headers extends Component{
  constructor(props) {
    super(props);
    if (window.matchMedia("(max-width: 480px)").matches) {
      props.dispatch({
        type: 'admin/isMobile',
        payload: true,
      });
    }
  }

  toggle = () => {
    this.props.dispatch({
      type: 'admin/toggle',
      payload: !this.props.collapse
    })
  };
    render() {
      return (
        <Header className={style.header}>
          <Icon
            className={style.trigger}
            type={this.props.collapse? 'menu-unfold' : 'menu-fold'}
            onClick={() => this.toggle()}
          />
          <Personal/>
        </Header>
      );
  }
}
function mapStateToProps(state) {
  const { role } = state.auth;
  const { collapse } = state.admin;
  return {
    role,
    collapse
  };
}

export default connect(mapStateToProps)(Headers);

