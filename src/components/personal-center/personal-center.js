import React, { Component } from 'react';
import { Statistic, Card, Row, Col, Icon,
  Avatar,Tooltip } from 'antd';
import AvatarChange from '../stand-component/avatar-change';
import { connect } from 'dva';
import RelationList from '../stand-component/relation-list'
const { Meta } = Card;

class PersonalCenter extends Component{

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
      <div style={{ background: '#ECECEC', padding: '30px', height: '100%' }}>
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="新增用户"
                value={1111}
                valueStyle={{ color: '#63B8FF' }}
                prefix={<Icon type="user-add" />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="新增点赞"
                value={2333}
                valueStyle={{ color: '#CD6839' }}
                prefix={<Icon type="like" />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="昨日阅读"
                value={1128}
                valueStyle={{ color: '#3f8600' }}
                prefix={<Icon type="area-chart" />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="新增收藏"
                value={1128}
                valueStyle={{ color: '#CD3700' }}
                prefix={<Icon type="star" />}
              />
            </Card>
          </Col>
        </Row>
        <Row style={{height: 40}}/>
        <Row gutter={16}>
          <Col span={6}>
            <Card
              style={{ height: 380 }}
              cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
              actions={[
                <Tooltip
                  title="修改签名"
                  placement="bottom"
                >
                  <Icon type="message" />
                </Tooltip>,
                <Tooltip
                  title="更换头像"
                  placement="bottom"
                >
                  <Icon type="picture" onClick={() => this.setState({visible: true})}/>
                </Tooltip>]}
            >
              <Meta
                avatar={<Avatar src={face} size="large"/>}
                title={name}
                description="签名"
              />
            </Card>
            <AvatarChange
              visible={this.state.visible}
              onCancel={() => this.setState({visible: false})}
              changeDisplay={() => this.setState({visible: false})}
              dispatch={this.props.dispatch}
            />
          </Col>
          <Col span={6}>
            <RelationList title="我的关注" data={data} url="https://s2.ax1x.com/2019/03/21/A3Z2pn.jpg"/>
          </Col>
          <Col span={6}>
            <RelationList title="我的收藏" data={data} url="https://s2.ax1x.com/2019/03/21/A3Z2pn.jpg"/>
          </Col>
          <Col span={6}>
            <RelationList title="我的粉丝" data={data} url="https://s2.ax1x.com/2019/03/21/A3Z2pn.jpg"/>
          </Col>
        </Row>
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

export default connect(mapStateToProps)(PersonalCenter)
