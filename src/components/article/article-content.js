import React, { Component } from 'react';
import { connect } from 'dva';
import { Icon, Menu } from 'antd';
import { Link } from 'dva/router'
import styles from './article-content.css';

class ArticleContent extends Component{
  componentDidMount(){
    document.getElementById('content').style.minHeight= (window.screen.availHeight - 180) + 'px';
    this.props.dispatch({
      type: 'article/queryArticleById',
      payload: 1
    })
  }

  render(){
    const { articleContent } = this.props;
    return (
      <div style={{ height: '100%', width: '100%' }}>
          <div>
            <Menu
              mode="horizontal"
              style={{ paddingLeft: '75%', fontSize: 18 }}
            >
              <Menu.Item>
                <Link to="/"><Icon type="home" />首页</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to=""><Icon type="paper-clip"/>归档</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to=""><Icon type="tags" />标签</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to=""><Icon type="user"/>关于</Link>
              </Menu.Item>
            </Menu>
          </div>
        <div id="content">
          {articleContent.create_time}
        </div>
        <div className={styles.footer}>
          <span>Blog ©2018 Created by yker</span>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { articleContent } = state.article;
  console.log()
  return {
    articleContent
  };
}

export default connect(mapStateToProps)(ArticleContent)
