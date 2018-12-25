import React, {Component} from 'react';
import { connect } from 'dva';
import { Table, Popconfirm, Button } from 'antd';
import ModalForm from '../stand-component/modal-form';

class UserManage extends  Component{
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = (dispatch) => {
    const form = this.formRef.props.form;
    // 数据验证
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      dispatch({
        type: 'auth/createUser',
        payload: values
      });
      form.resetFields();
      this.setState({ visible: false });
    });
  };
  handleDelete = (key, dispatch) => {
    dispatch({
      type: 'auth/delUser',
      payload: key,
    })
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  render(){
    const { userData, dispatch } = this.props;

    const columns = [{
      title: 'id',
      dataIndex: 'id',
      key: 'id'
    }, {
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time'
    }, {
      title: '角色',
      dataIndex: 'role',
      key: 'role'
    }, {
      title: '操作',
      key:'action',
      dataIndex: 'action',
      render: (text, record) => (
        <span>
        <Button type="primary">更改</Button>
        <a> | </a>
        <Popconfirm title="确定删除?" okText="是" cancelText="否" onConfirm={() => {this.handleDelete(record.id, dispatch)}}>
          <Button type="danger">删除</Button>
        </Popconfirm>
      </span>
      ),
    }];

    const title = [{title: '姓名', en: 'name'}, {title: '密码', en: 'password'}];

    return (
      <div>
        <Button type="default" onClick={this.showModal}>添加用户</Button>
        <ModalForm
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={() => {this.handleCreate(dispatch)}}
          wrappedComponentRef={this.saveFormRef}
          title="创建用户"
          data={title}
        />
        <Table columns={columns} dataSource={userData}/>
      </div>
    );
}

};

UserManage.propTypes = {
};
function mapStateToProps(state) {
  const { userData } = state.auth;
  return {
    userData,
  };
}

export default connect(mapStateToProps)(UserManage)
