import React, { Component } from 'react';
import { connect } from 'dva';
import { Icon, Menu } from 'antd';
import { Link} from 'dva/router'

import ArticleList from '../../components/article/list-article/article-list';

import styles from './IndexPage.css';

class IndexPage extends Component {
  componentDidMount(){
    this.props.dispatch({
      type: 'article/queryAllArticle',
      payload: 1
    })
  }

  render(){
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.edit}>
            <div className={styles.code}>
              <Icon type="smile" theme="twoTone" style={{ fontSize: '22px' }}/>
              <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" style={{ fontSize: '22px' }}/>
              <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{ fontSize: '22px' }}/>
            </div>
          </div>
          <div className={styles.header}>
            <Menu
              mode="horizontal"
              style={{ fontSize: 18, backgroundColor: 'transparent' }}
            >
              <Menu.Item>
                <Link to="/" style={{ color: '#dde4ec' }}><Icon type="home" style={{ color: '#dde4ec' }}/>首页</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="" style={{ color: '#dde4ec' }}><Icon type="paper-clip" style={{ color: '#dde4ec' }}/>归档</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="" style={{ color: '#dde4ec' }}><Icon type="tags" style={{ color: '#dde4ec' }}/>标签</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="" style={{ color: '#dde4ec' }}><Icon type="user" style={{ color: '#dde4ec' }}/>关于</Link>
              </Menu.Item>
            </Menu>
          </div>
        </div>
        <div className={styles.center}>
          <ArticleList />
        </div>
        <div className={styles.footer}>
          <span>Blog ©2018 Created by yker</span>
        </div>
      </div>
    );
  }
}

export default connect()(IndexPage);
