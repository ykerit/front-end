import React from 'react';
import { Card, List, Popconfirm, Button, Avatar } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import styles from './relation-list.css';

export default function RelationList({ data, title, url}) {
  return (
    <Card
      className={styles.list}
      title={title}
      bordered={false}>
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        hasMore={true}
        useWindow={false}
        loadMore={()=>{}}
      >
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item actions={[
              <span>
                <Popconfirm title="确认删除吗?" okText="是" cancelText="否">
                  <Button type="danger">删除</Button>
                </Popconfirm>
              </span>
            ]}>
              <List.Item.Meta
                avatar={<Avatar src={url} />}
                title={item.title}
              />
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </Card>
  );
}
