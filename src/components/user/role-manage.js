import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Popconfirm, Button } from 'antd';
import ModalForm from '../stand-component/modal-form';

class RoleManage extends Component{

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
      // 添加角色
      dispatch({
        type: 'auth/createRole',
        payload:values,
      });

      form.resetFields();
      this.setState({ visible: false });
    });
  };

  handleDelete = (key, dispatch) => {
    console.log(key);
    dispatch({
      type: 'auth/delRole',
      payload: key,
    })
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  render(){

    const { roleData, dispatch } = this.props;

    const columns = [{
      title: 'id',
      dataIndex: 'id',
      key: 'id'
    }, {
      title: '身份名',
      dataIndex: 'role_name',
      key: 'role_name'
    }, {
      title: '所属权限',
      dataIndex: 'auths',
      key: 'auths'
    }, {
      title: '操作',
      key:'action',
      dataIndex: 'action',
      render: (text, record) => (
        <span>
        <Button type="primary">更改</Button>
        <a> | </a>
        <Popconfirm title="确定删除吗" okText="是" cancelText="否" onConfirm={() => this.handleDelete(record.id, dispatch)}>
          <Button type="danger">删除</Button>
        </Popconfirm>
      </span>
      ),
    }];

    const title = [{title: '身份名', en: 'name'}, {title: '所属权限', en: 'auth'}];
    // 关于为啥需要在这里dispatch 是因为各个modal需要不同的dispatch， 在handleCreate函数中 不能直接传入参数
    // 所以需要 使用箭头函数 来传入dispatch参数 因为dispatch函数是由props父组件属性携带的
    return (
      <div>
        <Button type="default" onClick={this.showModal}>添加角色</Button>
        <ModalForm
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={() => {this.handleCreate(dispatch)}}
          wrappedComponentRef={this.saveFormRef}
          title="创建角色"
          data={title}
        />
        <Table columns={columns} dataSource={roleData}/>
      </div>
    );
  }
}

RoleManage.propTypes = {
};
function mapStateToProps(state) {
  const { roleData } = state.auth;
  console.log(roleData);
  return {
    roleData,
  };
}

export default connect(mapStateToProps)(RoleManage)
