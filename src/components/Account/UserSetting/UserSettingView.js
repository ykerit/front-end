import React, { Component } from 'react';
import { connect } from 'dva';
import { Menu } from 'antd';
import BasicSetting from './BasicSetting/BasicSetting';
import styles from './UserSettingView.css';

const { Item } = Menu;

class Info extends Component {

  state={
    selectKey: 'BasicSetting',
    menuMap: [
      {
        key: 'BasicSetting',
        title: '基础设置'
      },{
        key: 'more',
        title: '更多设置'
      }
    ]
  };

  upCurrentInfo = (val) => {
    this.props.dispatch({
      type: 'auth/updateCurrentUser',
      payload: {id: this.props.data.id, values: val}
    })
  };

  getmenu = () => {
    const { menuMap } = this.state;
    return menuMap.map(item => <Item key={item.key}>{item.title}</Item>);
  };

  getRightTitle = () => {
    const { selectKey, menuMap } = this.state;
    for (let i = 0; i < menuMap.length; i++) {
      if (menuMap[i].key === selectKey) {
        return menuMap[i].title;
      }
    }
  };

  selectKey = ({ key }) => {
    this.setState({
      selectKey: key,
    });
  };


  render() {
    const { isMobile, data, dispatch } = this.props;
    const { selectKey } = this.state;
    return (
      <div
        className={styles.main}
      >
          <div className={styles.leftMenu}>
            <Menu
              style={{ width: 224 }}
              mode={isMobile ? "horizontal" : "inline"}
              selectedKeys={[selectKey]}
              onClick={this.selectKey}>
              {this.getmenu()}
            </Menu>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>{this.getRightTitle()}</div>
            <BasicSetting data={data} upCurrentInfo={this.upCurrentInfo} dispatch={dispatch}/>
          </div>
        </div>
    );
  }
}
function mapStateToProps(state) {
  const {
    id,
    name,
    face,
    signature,
    title,
    group
  } = state.auth;
  const { isMobile } = state.admin;
  return {
    isMobile, data: {id, name, face, signature, title, group}
  };
}

export default connect(mapStateToProps)(Info);
