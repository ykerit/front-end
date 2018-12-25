import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Layout } from 'antd';

const FormItem = Form.Item;

class LoginForm extends Component {
  handleSubmit = (e) => {
    const { onOk } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('form: ', values);
        onOk(values)
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout style={{ justifyContent:"center", alignItems: "center", height:"100%", flexDirection: "column"}}>
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入姓名!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="姓名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住我</Checkbox>
          )}
          <Button type="primary" htmlType="submit" style={{width: '100%'}}>
            登录
          </Button>
        </FormItem>
      </Form>
      </Layout>
    );
  }
}

export default Form.create()(LoginForm);
