import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import NewArticle from './new-article/article-newArticle';
import ArticleList from './list-article/article-list';
import style from './article-manage.css';

function ArticeManage({dispatch, display}) {
  function OnClick() {
    dispatch({
      type: 'article/reflash_display',
      payload:true
    })
  }
  return (
    <div>
      <div className={style.container}>
      <div style={{ display: display ? 'none' : 'block'}}>
        <Button type="primary" onClick={OnClick}>新建文章</Button>
      </div>
      <div style={{ display: display ? 'none' : 'block'}} className={style.list}>
        <ArticleList/>
      </div>
      </div>
      <div style={{ display: display ? 'block' : 'none'}}>
        <NewArticle/>
      </div>
    </div>
  );
}

ArticeManage.propTypes = {
};

function mapStateToProps(state) {
  const { display } = state.article;
  return {
    display,
  };
}

export default connect(mapStateToProps)(ArticeManage);
