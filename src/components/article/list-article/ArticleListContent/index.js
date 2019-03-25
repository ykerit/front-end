import React from 'react';
import { Avatar } from 'antd';
import styles from './index.css';

const ArticleListContent = ({ description, face, name, create_time }) => (
  <div>
    <div className={styles.description}>{description}</div>
    <div className={styles.extra}>
      <Avatar src={face} size="small" className={styles.avatar}/>
      <span>{name}</span> 发布
      <em>{create_time}</em>
    </div>
  </div>
);

export default ArticleListContent;
