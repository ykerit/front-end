import React, { Component } from 'react';
import { Form, Input, Button, Avatar } from 'antd';
import AvatarChange from '../../../stand-component/avatar-change';
import styles from './BasicSetting.css';

class BasicSetting extends Component {

  state = {
    visible: false
  };
  componentDidMount() {
    const { setFieldsValue } = this.props.form;
    const { data } = this.props;
    setFieldsValue({'nickname': data.name });
    setFieldsValue({'signature': data.signature });
    setFieldsValue({'title': data.title });
    setFieldsValue({'group': data.group });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.upCurrentInfo(values)
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { data, dispatch } = this.props;
    return (
      <div className={styles.baseView}>
      <div className={styles.left}>
        <Form
          hideRequiredMark
          layout="vertical"
          onSubmit={this.handleSubmit}
        >
          <Form.Item label="昵称">
            {getFieldDecorator('nickname', {
              rules: [{ required: true, message: '请输入用户名!', whitespace: true }],
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item label="个性签名">
            {getFieldDecorator('signature', {
              rules: [{ required: true, message: '请输入昵称!', whitespace: true }],
            })(
              <Input/>
            )

            }
          </Form.Item>
          <Form.Item label="个人简介">
            {getFieldDecorator('title', {
              rules: [{ required: true, whitespace: true }],
            })(
              <Input.TextArea
              rows={4}
              />
            )}
          </Form.Item>
          <Form.Item label="学历">
            {getFieldDecorator('group', {
              rules: [{ required: true, whitespace: true }],
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              更新基本信息
            </Button>
          </Form.Item>
        </Form>
      </div>
        <div className={styles.right}>
          <div className={styles.avatarContent}>
            <Avatar src={data.face} className={styles.avatar}/>
          </div>
          <div className={styles.button_view}>
            <Button onClick={() => this.setState({visible: true})}>更换头像</Button>
          </div>
        </div>
        <AvatarChange
          visible={this.state.visible}
          onCancel={() => this.setState({visible: false})}
          changeDisplay={() => this.setState({visible: false})}
          dispatch={dispatch}
        />
      </div>
    );
  }
}
export default Form.create()(BasicSetting);
