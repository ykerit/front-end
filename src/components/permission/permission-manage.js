import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Popconfirm, Button } from 'antd';
import TableFrame from '../../layout/table-frame/table-frame'
import ModalForm from '../stand-component/modal-form';

class PermissionManage extends Component{

  state = {
    visible: false,
    current: null,
  };
  componentDidMount(){
    this.props.dispatch({
      type: 'admin/queryPermission',
      payload: 1
    });
  }

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
      // 添加权限
      dispatch({
        type: 'admin/createPermission',
        payload:values,
      });

      form.resetFields();
      this.setState({ visible: false });
    });
  };

  handleDelete = (key, dispatch) => {
    dispatch({
      type: 'admin/delPermission',
      payload: key,
    })
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  render(){

    const { permission, permission_total, dispatch } = this.props;

    const columns = [{
      title: 'id',
      dataIndex: 'id',
      key: 'id'
    }, {
      title: '所属组',
      dataIndex: 'role',
      key: 'role'
    }, {
      title: '权限名',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: 'URL',
      dataIndex: 'url',
      key: 'url'
    }, {
      title: '方法',
      dataIndex: 'method',
      key: 'method'
    },{
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time'
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

    const title = [
      {title: '权限名称', en: 'name'},
      {title: '所属组', en: 'role'},
      {title: 'URL', en: 'url'},
      {title: '方法', en: 'method'}];

    return (
      <TableFrame text="添加权限" showModal={this.showModal}>
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
          dataSource={permission}
          pagination={{
            onChange: (page) => {
              this.setState({current: page});
              dispatch({
                type: 'admin/queryPermission',
                payload: page,
              })
            },
            current: this.state.current,
            total: permission_total,
            pageSize: 10,
          }}
        />
      </TableFrame>
    );
  }
}

PermissionManage.propTypes = {
};
function mapStateToProps(state) {
  const { permission, permission_total } = state.admin;
  return {
    permission,
    permission_total
  };
}

export default connect(mapStateToProps)(PermissionManage)
