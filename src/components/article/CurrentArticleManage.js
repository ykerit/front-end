import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux} from 'dva/router';
import TableFrame from '../../layouts/TableFrame/TableFrame';
import ArticleList from "./list-article";

class CurrentArticleManage extends Component{
  state = {
    current_page: 1,
  };
  componentDidMount(){
    this.props.dispatch({
      type: 'article/queryCurrentUserArticle',
      payload: {id: this.props.id, page_size: 1}
    })
  };

  loadingMoreArticle = () => {
    this.props.dispatch({
      type: 'article/appendCurrentUserArticle',
      payload: {id: this.props.id, page_size: this.state.current_page+1},
    });
    this.setState({current_page: this.state.current_page+1});
  };

  render(){
    const { currentUserList, currentUserList_total } = this.props;
    return (
      <TableFrame
        text="新建文章"
        showModal={() => this.props.dispatch(routerRedux.push('/mdeditor'))}
        isButton={true}>
        <ArticleList
          title="所有文章"
          list={currentUserList}
          total={currentUserList_total}
          loadingMoreArticle={this.loadingMoreArticle}
        />
      </TableFrame>
    );
  }
}
function mapStateToProps(state) {
  const { id } = state.auth;
  const { currentUserList, currentUserList_total } = state.article;
  return {
    id,
    currentUserList,
    currentUserList_total
  };
}

export default connect(mapStateToProps)(CurrentArticleManage);
