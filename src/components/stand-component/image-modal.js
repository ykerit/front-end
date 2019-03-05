import React,{ Component } from 'react';
import { getlocalStorage } from '../../utils/helper';
import { Modal, Form, Input, Upload, message, Button, Icon, } from 'antd';
const FormItem = Form.Item;

class ImageModal extends Component{
  state = {
    display: false
  };
  render(){
    const { visible, onCancel, onCreate} = this.props;
    const { getFieldDecorator } = this.props.form;
    const props = {
      name: 'file',
      action: '//127.0.0.1:5000/api/image?type=markdown',
      headers: {
        'Authorization': getlocalStorage('token'),
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 图片上传成功！`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 图片上传失败.`);
        }
      },
    };

    return (
      <Modal
        visible={visible}
        title="插入图片"
        okText="插入"
        cancelText="取消"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem label="图片URL" style={{display: !this.state.display ? 'block' : 'none'}}>
            {getFieldDecorator('url', {
              rules: [{
                pattern: /(http|https):\/\/([\w.]+\/?)\S*/,
                message: 'url必须以http或https开头'
              }],
            })(<Input/>)}
          </FormItem>
          <FormItem style={{display: this.state.display ? 'block' : 'none'}}>
            {getFieldDecorator('upload', {
              valuePropName: 'file'
            })(
              <Upload {...props} style={{ display: this.state.display ? 'block' : 'none' }}>
                <Button>
                  <Icon type="upload" /> 上传图片
                </Button>
              </Upload>
            )}
          </FormItem>
          <p>或：
            <a
              onClick={() => this.setState({display: true})}
              style={{display: !this.state.display ? 'block' : 'none'}}>
              上传图片
            </a>
            <a
              onClick={() => this.setState({display: false})}
              style={{display: this.state.display ? 'block' : 'none'}}>
              插入链接
            </a>
          </p>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(ImageModal);
