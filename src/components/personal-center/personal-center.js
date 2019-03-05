import React, { Component } from 'react';
import { Statistic, Card, Row, Col, Icon,
  Avatar, List, Button, Popconfirm, Tooltip } from 'antd';
import AvatarChange from '../stand-component/avatar-change';
import { connect } from 'dva';
const { Meta } = Card;

class PersonalCenter extends Component{

  state = {
    visible: false,
  };

  render(){
    const { image_url, name } = this.props;
    const data = [
      {
        title: 'Ant Design Title 1',
      },
      {
        title: 'Ant Design Title 2',
      },
      {
        title: 'Ant Design Title 3',
      },
      {
        title: 'Ant Design Title 4',
      },
    ];
    return (
      <div style={{ background: '#ECECEC', padding: '30px', height: 700 }}>
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
              style={{ width: 420 }}
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
                avatar={<Avatar src={image_url} size="large"/>}
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
            <Card
              title="我的关注"
              bordered={false}>
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                  <List.Item actions={[
                    <span>
                      <Popconfirm title="确认删除吗?" okText="是" cancelText="否">
                        <Button type="danger">删除</Button>
                      </Popconfirm>
                    </span>]}>
                    <List.Item.Meta
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      title={<a href="https://ant.design">{item.title}</a>}
                      description="Ant Design Team"
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              title="我的收藏"
              bordered={false}>
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                  <List.Item actions={[
                    <span>
                      <Popconfirm title="确认删除吗?" okText="是" cancelText="否">
                        <Button type="danger">删除</Button>
                      </Popconfirm>
                    </span>
                  ]}>
                    <List.Item.Meta
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      title={<a href="https://ant.design">{item.title}</a>}
                      description="Ant Design Team"
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              title="我的粉丝"
              bordered={false}>
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                  <List.Item actions={[
                    <span>
                      <Popconfirm title="确认删除吗?" okText="是" cancelText="否">
                        <Button type="danger">删除</Button>
                      </Popconfirm>
                    </span>
                  ]}>
                    <List.Item.Meta
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      title={<a href="https://ant.design">{item.title}</a>}
                      description="Ant Design Team"
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { image_url, name } = state.auth;
  return {
    image_url,
    name
  };
}

export default connect(mapStateToProps)(PersonalCenter)
