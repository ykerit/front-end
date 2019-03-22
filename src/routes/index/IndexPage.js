import React, { Component } from 'react';
import { connect } from 'dva';
import CommonFrame from '../../layout/common/common-frame'
import ArticleList from '../../components/article/list-article/article-list';
import styles from './IndexPage.css';

class IndexPage extends Component {
  componentDidMount(){
    this.props.dispatch({
      type: 'article/queryAllArticle',
      payload: 1
    });
    this.props.dispatch({
      type: 'kind/queryAllClass'
    })
  }

  render(){
    return (
      <CommonFrame ourStyle={styles.content}>
        <div className={styles.center}>
          <ArticleList/>
        </div>
      </CommonFrame>
    );
  }
}

export default connect()(IndexPage);
