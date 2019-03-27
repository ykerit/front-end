import React, {Component} from 'react';
import { connect } from 'dva'
import { Link } from 'dva/router'
import { List, Icon, Card, Tag, Button, Popconfirm } from 'antd';
import ArticleListContent from './ArticleListContent/index'
import styles from './index.css';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class ArticleList extends Component{
  componentDidMount() {
    this.size = document.documentElement.clientHeight / 200;
  }

  handleDelete = key=> {
    console.log('hh');
    this.props.dispatch({
      type: 'article/deleteArticle',
      payload: key,
    })
  };

  render() {
    const { list, total, title,  loadingMoreArticle} = this.props;
    const loadMore =
      total > parseInt(this.size, 10) ? (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Button
            onClick={loadingMoreArticle}
            style={{ paddingLeft: 48, paddingRight: 48 }}>
            加载更多
          </Button>
        </div>
      ) : null;

    return (
      <Card
        className={styles.card}
        bordered={false}
        title={title}
        bodyStyle={{ padding: '8px 32px 32px 32px' }}
      >
        <List
          size="large"
          loading={false}
          rowKey="id"
          itemLayout="vertical"
          loadMore={loadMore}
          dataSource={list}
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[
                <IconText type="star-o" text={item.star} />,
                <IconText type="message" text={item.number} />,
              ]}
              extra={<div className={styles.listItemExtra}>
                {title === '' ? (
                  <span>
                    <Popconfirm title="确认删除吗?" okText="是" cancelText="否" onConfirm={() => this.handleDelete(item.id)}>
                      <Button type="danger" >删除</Button>
                    </Popconfirm>
                  </span>) : null
                }
              </div>}
            >
              <Link to={`/article/${item.id}`} className={styles.nav}>
              <List.Item.Meta
                title={item.title}
                description={
                  <span>
                    {
                      item.tag.map((child, index)=> {
                        return (
                          <Tag key={index}>{child}</Tag>
                        )
                      })
                    }
                  </span>
                }
              />
                <ArticleListContent data={item} />
              </Link>
            </List.Item>
          )}
        />
      </Card>
    );
  }
}

export default connect()(ArticleList);
