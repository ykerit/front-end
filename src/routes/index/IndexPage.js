import React, { Component } from 'react';
import { connect } from 'dva';
import CommonFrame from '../../layouts/Common/CommonFrame'
import ArticleList from '../../components/article/list-article/index';
import {getlocalStorage, dellocalStorage} from '../../utils/helper';

class IndexPage extends Component {
  state = {
    current_page: 1,
  };
  componentDidMount(){
    if (getlocalStorage('id')) {
      this.props.dispatch({
        type: 'auth/queryUserInfo',
        payload: getlocalStorage('id')
      });
    } else {
      dellocalStorage();
    }
    this.props.dispatch({
      type: 'article/queryAllArticle',
      payload: 1
    });
    this.props.dispatch({
      type: 'kind/queryAllClass'
    });
  }
  loadingMoreArticle = () => {
    this.props.dispatch({
      type: 'article/appendArticle',
      payload: this.state.current_page+1,
    });
    this.setState({current_page: this.state.current_page+1});
  };

  render(){
    const { articleList, total } = this.props;
    return (
      <CommonFrame>
          <ArticleList
            loadingMoreArticle={this.loadingMoreArticle}
            title="所有文章"
            list={articleList}
            total={total}/>
      </CommonFrame>
    );
  }
}
function mapStateToProps(state) {
  const { articleList, total } = state.article;
  return {
    articleList,
    total
  };
}

export default connect(mapStateToProps)(IndexPage);
