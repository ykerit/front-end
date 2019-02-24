import React, { Component } from 'react';
import { Button, Input, Row, Col } from 'antd';
import NewModal from './article-modal';

class ArticleEdit extends Component{
  render(){
    const { receiveTag, receiveKind,
      releaseArticle, receiveTitle, backAdmin,
      visible, onCancel, onOpen } = this.props;
    return (
      <Row>
        <Row>
          <Col span={20} style={{ paddingTop: 10 }}>
            <Input
              placeholder="请输入标题"
              style={{ width: '100%', marginLeft: 5 }}
              onChange={e => receiveTitle(e.target.value) }/>
          </Col>
          <Col span={2} style={{ paddingTop: 10 }}>
            <Button
              style={{ marginLeft: 20 }}
              type="primary"
              onClick={() => onOpen({visible: true})}>
              发布文章
            </Button>
          </Col>
          <Col span={2} style={{ paddingTop: 10 }}>
            <Button type="primary" onClick={() => backAdmin()}>
              回到后台
            </Button>
          </Col>
        </Row>
        <Row style={{height: 10}}/>
        {this.props.children}
        <Row>
          <NewModal
            visible={visible}
            onOk={releaseArticle}
            receiveTag={receiveTag}
            receiveKind={receiveKind}
            onCancel={onCancel}/>
        </Row>
      </Row>
    );
  }
}

export default ArticleEdit;
