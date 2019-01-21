import React, {Component} from 'react';
import { Modal, Form, Button, Switch, Select, Input } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class NewModal extends Component{

  render(){
    const { onOk, onCancel, visible } = this.props;
    return (
      <Modal
        visible={visible}
        title="发布文章"
        okText="发布文章"
        cancelText="取消"
        onCancel={onCancel}
        onOk={onOk}
      >
        <Form layout="vertical">
          <FormItem>
            文章标签：
            <Input style={{width: 50}} disabled/>
            <Button type="primary" shape="circle" icon="plus"/>
          </FormItem>
          <FormItem>
            个人分类：
            <Input style={{width: 50}} disabled/>
            <Button type="primary" shape="circle" icon="plus"/>
          </FormItem>
          <FormItem>
            文章类型：
            <Select defaultValue="ori" style={{ width: 120 }}>
              <Option value="ori">原创</Option>
              <Option value="other">转载</Option>
            </Select>
          </FormItem>
          <FormItem>
            私密文章：<Switch checkedChildren="私密" unCheckedChildren="公开"/>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default NewModal;
