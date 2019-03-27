import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux} from 'dva/router';
import ArticleList from './list-article/index';
import TableFrame from '../../layouts/TableFrame/TableFrame';

class ArticeManage extends Component{
  state = {
    current_page: 1,
  };
  componentDidMount(){
    this.props.dispatch({
      type: 'article/queryAllArticle',
      payload: 1
    })
  };

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
      <TableFrame
        text="新建文章"
        showModal={() => this.props.dispatch(routerRedux.push('/mdeditor'))}
        isButton={true}>
        <ArticleList
          title="所有文章"
          list={articleList}
          total={total}
          loadingMoreArticle={this.loadingMoreArticle}
        />
      </TableFrame>
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

export default connect(mapStateToProps)(ArticeManage);
