import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Row } from 'antd';
import { routerRedux} from 'dva/router';
import ArticleList from './list-article/article-list';

class ArticeManage extends Component{
  state = {
    display: false
  };
  componentDidMount(){
    this.props.dispatch({
      type: 'article/queryAllArticle',
      payload: 1
    })
  };

  render(){
    return (
      <div style={{ padding: '8px', height: '100%', backgroundColor: '#FFFFFF' }}>
        <Row>
          <Row>
            <Button
              type="primary"
              style={{ marginTop: 10, marginLeft: 20 }}
              onClick={() => this.props.dispatch(routerRedux.push('/mdeditor'))}>
              新建文章
            </Button>
          </Row>
          <Row style={{height: 20}}/>
          <Row>
            <ArticleList/>
          </Row>
        </Row>
      </div>
    );
  }
}

ArticeManage.propTypes = {
};

export default connect()(ArticeManage);
