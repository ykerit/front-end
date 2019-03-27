import React, {Component} from 'react';
import { Modal, Form, Switch, Select } from 'antd';
import TagPlugin from './plugin/tag-plugin';
import KindPlugin from './plugin/kind-plugin'
const FormItem = Form.Item;
const Option = Select.Option;

class NewModal extends Component{

  render(){
    const { onOk, onCancel, visible,
      receiveTag, receiveKind, classification,
      addClassification } = this.props;

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
            <TagPlugin receiveTag={receiveTag}/>
          </FormItem>
          <FormItem>
            <KindPlugin receiveKind={receiveKind} classification={classification} addClassification={addClassification}/>
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
