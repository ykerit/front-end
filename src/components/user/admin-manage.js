import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Popconfirm, Button } from 'antd';
import ModalForm from '../stand-component/form-modal';
import TableFrame from '../../layout/table-frame/table-frame';

class AdminManage extends Component{

  state = {
    visible: false,
    current: null,
  };

  componentDidMount(){
    this.props.dispatch({
      type: 'user/queryAdmins',
      payload: 1
    })
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
      // 添加管理员
      dispatch({
        type: 'user/createAdmin',
        payload:values,
      });

      form.resetFields();
      this.setState({ visible: false });
    });
  };

  handleDelete = (key, dispatch) => {
    dispatch({
      type: 'user/delAdmin',
      payload: key,
    })
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  render(){

    const { adminData, dispatch, admin_total  } = this.props;

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
        <Popconfirm title="确认删除吗?" okText="是" cancelText="否" onConfirm={() => this.handleDelete(record.id, dispatch)}>
          <Button type="danger">删除</Button>
        </Popconfirm>
      </span>
      ),
    }];

    const title = [{title: '姓名', en: 'name'}, {title: '密码', en: 'password'}];

    return (
      <TableFrame text="添加管理员" showModal={this.showModal} isButton={true}>
        <ModalForm
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={() => {this.handleCreate(dispatch)}}
          wrappedComponentRef={this.saveFormRef}
          title="创建管理员"
          data={title}
        />
        <Table
          rowKey={record => record.id}
          columns={columns}
          dataSource={adminData}
          pagination={{
            onChange: (page) => {
              this.setState({current: page});
              dispatch({
                type: 'user/queryAdmins',
                payload: page,
              })
            },
            current: this.state.current,
            total: admin_total,
            pageSize: 10,
          }}
        />
      </TableFrame>
    );
  }
}

AdminManage.propTypes = {
};
function mapStateToProps(state) {
  const { adminData, admin_total } = state.user;
  return {
    adminData,
    admin_total
  };
}

export default connect(mapStateToProps)(AdminManage)
