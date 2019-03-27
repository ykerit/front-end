import React, { Component } from 'react';
import { connect } from 'dva';
import CommonFrame from '../../layouts/Common/CommonFrame';

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
