import React, { Component } from 'react';
import {
  Menu, Icon
} from 'antd';
import { connect } from 'dva';
const SubMenu = Menu.SubMenu;

class Menus extends Component{

  render(){
    const { selectedKey, menus } = this.props;
    return (
      <Menu
        theme="light"
        mode="inline"
        inlineCollapsed
        defaultSelectedKeys={['VisitorAnalysis']}
        onClick={key => selectedKey(key)}
      >
        {
          menus.map(ele => {
            if(ele.child){
              return (
                <SubMenu key={ele.key} title={<span><Icon type={ele.type} /><span>{ele.name}</span></span>}>
                  {ele.child.map(item =>
                    <Menu.Item key={item.key}>
                      <Icon type={item.type} />
                      <span style={{ textAlign: 'center' }}>{item.name}</span>
                    </Menu.Item>
                  )}
                </SubMenu>
              )
            }else {
              return (
                <Menu.Item key={ele.key}>
                  <Icon type={ele.type} />
                  <span style={{ textAlign: 'center' }}>{ele.name}</span>
                </Menu.Item>
              )
            }
          })
        }
      </Menu>
    );
  }
}
function mapStateToProps(state) {
  const { role } = state.auth;
  return {
    role
  };
}

export default connect(mapStateToProps)(Menus);
