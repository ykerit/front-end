import React,{ Component } from 'react'
import { Modal, Form, Input } from 'antd';
const FormItem = Form.Item;

class FormModal extends Component{

  render(){
    const { visible, onCancel, onCreate, title, data } = this.props;
    const { getFieldDecorator } = this.props.form;
    // modal基础化
    const formList = (data) => {
      let res = [];
      for (let item of data ){
        res.push(
          <FormItem label={item.title} key={item.en}>
            {getFieldDecorator(item.en)(<Input type="textarea" />)}
          </FormItem>
        );
      }
      return res;
    };

    return (
      <Modal
        visible={visible}
        title={title}
        okText="创建"
        cancelText="取消"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          {formList(data)}
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(FormModal);

