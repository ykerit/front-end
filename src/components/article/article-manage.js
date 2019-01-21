import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import NewArticle from './new-article/article-newArticle';
import ArticleList from './list-article/article-list';
import style from './article-manage.css';

class ArticeManage extends Component{
  state = {
    display: false,
  };
  componentDidMount(){
    this.props.dispatch({
      type: 'article/queryAllArticle',
      payload: 1
    })
  };

  handleRefresh = (value) => this.setState({display: value});
  render(){
    return (
      <div>
        <div className={style.container}>
          <div style={{ display: this.state.display ? 'none' : 'block'}}>
            <Button type="primary"
                    style={{ marginTop: 10 }}
                    onClick={() => this.setState({ display: true })}>
              新建文章
            </Button>
          </div>
          <div style={{ display: this.state.display ? 'none' : 'block'}} className={style.list}>
            <ArticleList/>
          </div>
        </div>
        <div style={{ display: this.state.display ? 'block' : 'none'}}>
          <NewArticle refreshes={this.handleRefresh}/>
        </div>
      </div>
    );
  }

}

ArticeManage.propTypes = {
};

export default connect()(ArticeManage);
