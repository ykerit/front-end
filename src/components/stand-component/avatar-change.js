import React,{ Component } from 'react'
import AvatarEditor from 'react-avatar-editor';
import { Modal, Input, Icon } from 'antd';

class AvatarChange extends Component{
  state = {
    loading: false,
    originImg: null,
    display: false,
    finalImage: null,
  };

  UploadImage = () => {
    if (this.editor) {
      const canvasScaled = this.editor.getImageScaledToCanvas();
      canvasScaled.toBlob((file) => {
        const data = new FormData();
        data.append('file', file);
        this.props.dispatch({
          type: 'auth/UploadAvatar',
          payload: data
        })
      },'image/jpeg', 1);
    }
    this.props.changeDisplay();
  };

  openImage = () => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imgFile = e.target.result;
      this.setState({
        originImg: imgFile,
        display: true
      });
    };
    reader.readAsDataURL(this.file.input.files[0]);
  };


  setEditorRef = (editor) => this.editor = editor;

  render(){
    const { visible, onCancel } = this.props;


    return (
      <Modal
        visible={visible}
        title="更换头像"
        okText="更改"
        cancelText="取消"
        onCancel={onCancel}
        onOk={this.UploadImage}
      >
        <AvatarEditor
          ref={this.setEditorRef}
          image={this.state.originImg}
          width={250}
          height={250}
          border={50}
          color={[255, 255, 255, 0.6]}
          borderRadius={200}
          scale={1.2}
          style={{ margin: '0 50px', display: this.state.display ? 'block' : 'none' }}
        />
        <Input
          style={{ display: !this.state.display ? 'block' : 'none' }}
          type="file"
          prefix={<Icon type="upload" />}
          ref={(input) => { this.file = input; }}
          onChange={this.openImage} />
      </Modal>
    );
  }
}

export default AvatarChange;
