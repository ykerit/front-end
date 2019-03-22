import React, { Component } from 'react';
import { connect } from 'dva';
import CommonFrame from '../../layout/common/common-frame';
import Collapse from '../../components/stand-component/collapse'
import style from './classification.css';


class ClassificationPage extends Component{

  render() {
    const { classification } = this.props;
    return (
      <CommonFrame ourStyle={style.content}>
        <Collapse data={classification}/>
      </CommonFrame>
    );
  }
}
function mapStateToProps(state) {
  const { classification } = state.kind;
  return {
    classification
  };
}

export default connect(mapStateToProps)(ClassificationPage)
