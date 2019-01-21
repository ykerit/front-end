import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Popconfirm, Button } from 'antd';
import ModalForm from '../stand-component/modal-form';

class TagManage extends Component{

  state = {
    visible: false,
  };
  componentDidMount(){
    this.props.dispatch({
      type: 'admin/queryTag',
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
      // 添加权限
      dispatch({
        type: 'admin/createTag',
        payload:values,
      });

      form.resetFields();
      this.setState({ visible: false });
    });
  };

  handleDelete = (key, dispatch) => {
    dispatch({
      type: 'admin/delTag',
      payload: key,
    })
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  render(){

    const { tag, tag_total, dispatch } = this.props;

    const columns = [{
      title: 'id',
      dataIndex: 'id',
      key: 'id'
    },{
      title: '标签名',
      dataIndex: 'name',
      key: 'name'
    }, {
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

    const title = [{title: '标签名', en: 'name'}];

    return (
      <div>
        <Button type="default" onClick={this.showModal}>添加标签</Button>
        <ModalForm
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={() => {this.handleCreate(dispatch)}}
          wrappedComponentRef={this.saveFormRef}
          title="创建标签"
          data={title}
        />
        <Table
          rowKey={record => record.id}
          columns={columns}
          dataSource={tag}
          pagination={{
            onChange: (page) => {
              dispatch({
                type: 'admin/queryTag',
                payload: page,
              })
            },
            total: tag_total,
            pageSize: 10,
          }}
        />
      </div>
    );
  }
}

TagManage.propTypes = {
};
function mapStateToProps(state) {
  const { tag, tag_total } = state.admin;
  return {
    tag,
    tag_total
  };
}

export default connect(mapStateToProps)(TagManage)
