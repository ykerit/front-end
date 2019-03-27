import React, { Component } from 'react';
import { connect } from 'dva';
import CommonFrame from '../../layouts/Common/CommonFrame';
import Collapse from '../../components/stand-component/collapse/collapse'
import style from './classification.css';


class ClassificationPage extends Component{

  render() {
    const { classification } = this.props;
    return (
      <CommonFrame>
        <div className={style.content}>
          <Collapse data={classification}/>
        </div>
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
