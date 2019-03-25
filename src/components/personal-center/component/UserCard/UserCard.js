import React from 'react';
import { Card, Avatar } from 'antd';
import styles from './UserCard.css';

export const UserCard = props => {
  return (
    <Card
      className={styles.card}
      title="个人信息"
      bordered={false}
    >
      <div className={styles.avatarContent}>
        <a onClick={props.show}><Avatar className={styles.avatarStyle} src={props.face} /></a>
      </div>
      <div className={styles.name}>
        <span>{props.name}</span>
      </div>
      <div className={styles.describe}>
        <span>{props.describe}</span>
      </div>
    </Card>
  );
};
