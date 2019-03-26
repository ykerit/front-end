import React, { Component } from 'react';
import AvatarChange from '../stand-component/avatar-change';
import { connect } from 'dva';
import {PanelGroup} from './component/PanelGroup/PanelGroup'
import {CardPanel} from './component/CardPanel/CardPanel'

class VisitorAnalysis extends Component{

  state = {
    visible: false,
  };

  render(){
    const { face, name } = this.props;
    const data = [
      {
        title: '不爱静香的哆啦A梦',
      },
      {
        title: '半夜钓鱼的小明',
      },
      {
        title: '锡纸烫的村口大爷',
      },
      {
        title: '走中路的打野',
      }
    ];
    return (
      <div>
        <PanelGroup/>
        <CardPanel data={data} face={face} name={name} show={() => this.setState({visible: true})} describe="阳光积极的大男孩"/>
        <AvatarChange
          visible={this.state.visible}
          onCancel={() => this.setState({visible: false})}
          changeDisplay={() => this.setState({visible: false})}
          dispatch={this.props.dispatch}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { face, name } = state.auth;
  return {
    face,
    name
  };
}

export default connect(mapStateToProps)(VisitorAnalysis)
