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
function ArticleList({ dispatch, articleList, total }) {
  return (
    <List
      style={{ padding: 6 }}
      itemLayout="vertical"
      pagination={{
        onChange: (page) => {
          dispatch({
            type: 'article/queryAllArticle',
            payload: page,
          })
        },
        pageSize: 4,
        total: total
      }}
      dataSource={articleList}
      renderItem={item => (
        <List.Item
          key={item.title}
          actions={[<IconText type="star-o" text={item.star} />,
            <IconText type="message" text={item.number} />,
            <IconText type="clock-circle" text={item.create_time}/>]}
        >
          <Link to={`/article/${item.id}`}>
          <List.Item.Meta
            title={item.title}
            description={item.description}
          />
          </Link>
        </List.Item>
      )}/>
  )
}
function mapStateToProps(state) {
  const { articleList, total } = state.article;
  return {
    articleList,
    total
  };
}
export default connect(mapStateToProps)(ArticleList);
