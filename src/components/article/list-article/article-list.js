import React, {Component} from 'react';
import { connect } from 'dva'
import { Link } from 'dva/router'
import { List, Icon, Card, Tag, Button } from 'antd';
import ArticleListContent from './ArticleListContent/index'
import styles from './article-list.css';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);
/*
<List
  style={{ padding: 6 }}
  header={<div>所有文章</div>}
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
  )}/>*/

class ArticleList extends Component{

  loadingMoreArticle = () => {
    this.props.dispatch({
      type: 'article/queryAllArticle',
      payload: 1,
    })
  };

  render() {
    const { articleList, loading } = this.props;
    const loadMore =
      articleList.length > 0 ? (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Button
            onClick={this.loadingMoreArticle}
            style={{ paddingLeft: 48, paddingRight: 48 }}>
            加载更多
          </Button>
        </div>
      ) : null;

    return (
      <Card
        style={{ marginTop: 24 }}
        bordered={false}
        bodyStyle={{ padding: '8px 32px 32px 32px' }}
      >
        <List
          size="large"
          loading={articleList.length === 0 ? loading : false}
          rowKey="id"
          itemLayout="vertical"
          loadMore={loadMore}
          dataSource={articleList}
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[
                <IconText type="star-o" text={item.star} />,
                <IconText type="message" text={item.number} />,
              ]}
              extra={<div className={styles.listItemExtra} />}
            >
              <List.Item.Meta
                title={item.title}
                description={
                  <span>
                      <Tag>Ant Design</Tag>
                      <Tag>设计语言</Tag>
                      <Tag>蚂蚁金服</Tag>
                    </span>
                }
              />
              <Link to={`/article/${item.id}`}>
                <ArticleListContent data={item} />
              </Link>
            </List.Item>
          )}
        />
      </Card>
    );
  }
}
function mapStateToProps(state) {
  const { articleList, total } = state.article;
  return {
    articleList,
    total
  };
}
export default connect(mapStateToProps)(ArticleList);
