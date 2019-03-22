import React, {Component} from 'react';
import {Avatar} from 'antd';
import style from './article-info.css';

export default class ArticleInfo extends Component{
  render() {
    const {face, time, star, name} = this.props;
    return (
      <div className={style.container}>
        <div className={style.avatar}>
          <Avatar size="large" src={face}/>
        </div>
        <div className={style.content}>
          <div className={style.name}>
            <span>{name}</span>
          </div>
          <div className={style.meta}>
            <span>{time}</span>
            <span>喜欢 {star}</span>
          </div>
        </div>
      </div>
    );
  }
}
