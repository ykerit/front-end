import React, { Component } from 'react';
import { connect } from 'dva';
import CommonFrame from '../../layout/common/common-frame';
import {  } from 'antd';
import style from './about.css';

class About extends Component{
  render() {
    return (
      <CommonFrame ourStyle={style.content}>
        for me
      </CommonFrame>
    );
  }
}

export default connect()(About)
