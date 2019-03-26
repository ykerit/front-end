import React, { Component } from 'react'
import { Form, Input, Button, Popover, Progress } from 'antd';
import { Link} from 'dva/router'
import style from './register.css';

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

const passwordStatusMap = {
  ok: (
    <div className={style.success}>
      强度：高
    </div>
  ),
  pass: (
    <div className={style.warning}>
      强度：中
    </div>
  ),
  poor: (
    <div className={style.error}>
      强度：太短
    </div>
  ),
};

class RegistrationForm extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    visible: false,
  };

  handleSubmit = (e) => {
    const { onOk } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        onOk(values)
      }
    });
  };

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={style[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={style.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码不一致!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { visible, confirmDirty } = this.state;
    if (!value) {
      this.setState({
        visible: !!value,
      });
      callback();
    } else {
      if (!visible) {
        this.setState({
          visible: !!value,
        });
      }
      if (value.length < 6) {
        callback('密码长度不足！');
      } else {
        const { form } = this.props;
        if (value && confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
    }
  };


  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className={style.main}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            <span/>
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('nickname', {
              rules: [{ required: true, message: '请输入用户名!', whitespace: true }],
            })(
              <Input placeholder="用户名"/>
            )}
          </Form.Item>
          <Form.Item>
            <Popover
              getPopupContainer={node => node.parentNode}
              content={
                <div style={{ padding: '4px 0' }}>
                  {passwordStatusMap[this.getPasswordStatus()]}
                  {this.renderPasswordProgress()}
                  <div style={{ marginTop: 10 }}>
                    请至少输入 6 个字符。请不要使用容易被猜到的密码。
                  </div>
                </div>
              }
              overlayStyle={{ width: 240 }}
              placement="right"
              visible={this.state.visible}
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: '请输入密码!',
                }, {
                  validator: this.validateToNextPassword,
                }],
              })(
                <Input type="password" placeholder="至少6位密码, 区分大小写"/>
              )}
            </Popover>
          </Form.Item>
          <Form.Item
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: '请输入确认密码!',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input type="password" onBlur={this.handleConfirmBlur} placeholder="确认密码"/>
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className={style.submit}
            >注册
            </Button>
            <Link className={style.login} to="login">
              使用已有账户登录
            </Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(RegistrationForm);
