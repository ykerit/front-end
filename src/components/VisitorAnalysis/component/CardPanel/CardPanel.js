import React from 'react'
import {Row, Col} from 'antd'
import RelationCard from '../../../stand-component/relation-card/relation-card';

export const CardPanel = props => {
  return (
    <Row gutter={12}>
      <Col
        lg={6}
        md={12}
        xs={24}
      >
        <RelationCard title="我的关注" data={props.data} url="https://s2.ax1x.com/2019/03/21/A3Z2pn.jpg"/>
      </Col>
      <Col
        lg={6}
        md={12}
        xs={24}
      >
        <RelationCard title="我的收藏" data={props.data} url="https://s2.ax1x.com/2019/03/21/A3Z2pn.jpg"/>
      </Col>
      <Col
        lg={6}
        md={12}
        xs={24}
      >
        <RelationCard title="我的粉丝" data={props.data} url="https://s2.ax1x.com/2019/03/21/A3Z2pn.jpg"/>
      </Col>
    </Row>
  );
};
