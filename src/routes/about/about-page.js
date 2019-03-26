import React, { Component } from 'react';
import { connect } from 'dva';
import CommonFrame from '../../layout/common/common-frame';

class About extends Component{
  render() {
    return (
      <CommonFrame>
          for me
      </CommonFrame>
    );
  }
}

export default connect()(About)
