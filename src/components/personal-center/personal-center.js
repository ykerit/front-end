import React, { Component } from 'react';
import { Statistic, Card, Row, Col, Icon, Avatar, List, Button, Popconfirm } from 'antd';
import { connect } from 'dva';
const { Meta } = Card;

class PersonalCenter extends Component{

  render(){
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
              style={{ width: 300 }}
              cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
              actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
            >
              <Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title="Card title"
                description="This is the description"
              />
            </Card>
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


export default connect()(PersonalCenter)
