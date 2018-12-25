import React from 'react';
import { connect } from 'dva'
import { Link } from 'dva/router'
import { List, Icon } from 'antd';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);
function ArticleList({ dispatch, articleList: dataSource }) {
  console.log(dataSource);
  console.log(dataSource.create_time);
  return (
    <List
      itemLayout="vertical"
      pagination={{
        onChange: (page) => {
          dispatch({
            type: 'article/queryAllArticle',
            payload: page - 1,
          })
        },
        pageSize: 4,
      }}
      dataSource={dataSource}
      renderItem={item => (
        <List.Item
          key={item.title}
          actions={[<IconText type="star-o" text={item.star} />, <IconText type="message" text={item.comment} />]}
        >
          <Link to={`/article/${item.id}`}>
          <List.Item.Meta
            description={item.create_time}
          />
          {item.info}
          </Link>
        </List.Item>
      )}/>
  )
}
function mapStateToProps(state) {
  const { articleList } = state.article;
  return {
    articleList
  };
}
export default connect(mapStateToProps)(ArticleList);
