import React, { Component } from 'react';
import { connect } from 'dva';
import CommonFrame from '../../layout/common/common-frame';
import { Timeline, Card, Empty } from 'antd';
import styles from './filed.css';

class FiledPage extends Component{

  componentDidMount() {
    this.props.dispatch({
      type: 'article/queryTimeLine'
    })
  }

  renderItem = data => data.map(item => {
    return (
      <Timeline.Item color="green" key={item.id}>
        <Card
          title={item.title}
          extra={<span>{item.create_time}</span>}
          style={{ width: 450 }}
        >
          <p>{item.description}</p>
        </Card>
      </Timeline.Item>
    );
  });

  render() {
    const { timeline } = this.props;
    return (
      <CommonFrame ourStyle={styles.content}>
        {timeline.length === 0 ? <Empty description="没有时间线哦！"/> :
          (<Timeline style={{ marginTop: 10 }}>
            {this.renderItem(timeline)}
          </Timeline>)}

      </CommonFrame>
    );
  }
}

function mapStateToProps(state) {
  const { timeline } = state.article;
  return {
    timeline
  };
}

export default connect(mapStateToProps)(FiledPage)
