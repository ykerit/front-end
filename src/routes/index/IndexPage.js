import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { Link} from 'dva/router'

import ArticleList from '../../components/article/list-article/article-list';

import styles from './IndexPage.css';

function IndexPage() {

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
          <div className={styles.menu}>
            <ul>
              <li><Icon type="home" />
                <Link to="/article/1" style={{ color: '#dde4ec' }}>首页</Link>
              </li>
              <li><Icon type="paper-clip"/>
                <Link to="" style={{ color: '#dde4ec' }}>归档</Link>
              </li>
              <li><Icon type="tags" />
                <Link to="" style={{ color: '#dde4ec' }}>标签</Link>
              </li>
              <li><Icon type="user"/>
                <Link to="" style={{ color: '#dde4ec' }}>关于</Link>
              </li>
            </ul>
          </div>
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

export default connect()(IndexPage);
