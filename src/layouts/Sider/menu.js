import React, { Component } from 'react';
import {
  Menu, Icon
} from 'antd';
const SubMenu = Menu.SubMenu;

export default class Menus extends Component{

  render(){
    const { selectedKey, menus, menuSelectKey } = this.props;
    return (
      <Menu
        theme="light"
        mode="inline"
        inlineCollapsed
        selectedKeys={[menuSelectKey]}
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

