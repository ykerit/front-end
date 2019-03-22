import React, { Component } from 'react';
import { connect } from 'dva';
import CommonFrame from '../../layout/common/common-frame';
import { Tag } from 'antd';
import style from './tags.css'

class Tags extends Component{
  render() {
    return (
      <CommonFrame ourStyle={style.content}>
        <Tag color="magenta">IT</Tag>
        <Tag color="red">互联网</Tag>
        <Tag color="volcano">二次元</Tag>
        <Tag color="orange">游戏</Tag>
        <Tag color="gold">Web开发</Tag>
        <Tag color="lime">游戏开发</Tag>
        <Tag color="green">全栈</Tag>
        <Tag color="cyan">LOL</Tag>
        <Tag color="blue">云计算</Tag>
        <Tag color="geekblue">数据结构</Tag>
        <Tag color="purple">算法</Tag>
      </CommonFrame>
    );
  }
}

export default connect()(Tags)
