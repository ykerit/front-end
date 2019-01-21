import React from "react";
import { List, Comment, Form, Input, Button } from 'antd';
// import moment from 'moment';
import styles from './comment.css';
const TextArea = Input.TextArea;

export default function Comments({data, onChange, onSubmit, value, dispatch, comment_total, page}) {
  return (
    <div>
      <div>
        <Form.Item>
          <TextArea
            placeholder="请自觉遵守互联网的相关政策法规，严禁发布色情、暴力、反动的言论。"
            rows={4}
            onChange={onChange}
            value={value} />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            onClick={onSubmit}
            type="primary"
          >
            发表评论
          </Button>
        </Form.Item>
      </div>
      <List
        className={styles["comment-list"]}
        header={`${data.length} 评论`}
        itemLayout="horizontal"
        pagination={{
          onChange: (pages) => {
            dispatch({
              type: 'article/queryComment',
              payload: {article: page, page_size: pages },
            })
          },
          total: comment_total,
          pageSize: 20,
          position: 'top'
        }}
        dataSource={data}
        renderItem={item => (
          <Comment
            author={item.author}
            avatar={item.avatar}
            content={(<p>{item.content}</p>)}
            datetime={
                <span>
                  {item.create_time}
                </span>
            }
          />
        )}
      />
    </div>
  );
}
