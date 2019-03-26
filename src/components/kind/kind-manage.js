import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Popconfirm, Button } from 'antd';
import ModalForm from '../stand-component/form-modal';
import TableFrame from '../../layout/table-frame/table-frame';

class KindManage extends Component{

  state = {
    visible: false,
    current: null
  };
  componentDidMount(){
    this.props.dispatch({
      type: 'admin/queryKind',
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
        type: 'admin/createKind',
        payload:values,
      });

      form.resetFields();
      this.setState({ visible: false });
    });
  };

  handleDelete = (key, dispatch) => {
    dispatch({
      type: 'admin/delKind',
      payload: key,
    })
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  render(){

    const { kind, kind_total, dispatch } = this.props;

    const columns = [{
      title: 'id',
      dataIndex: 'id',
      key: 'id'
    },{
      title: '分类名',
      dataIndex: 'name',
      key: 'name'
    },{
      title: '文章数',
      dataIndex: 'number',
      key: 'number'
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

    const title = [{title: '分类名', en: 'name'}];

    return (
      <TableFrame text="添加分类" showModal={this.showModal} isButton={true}>
        <ModalForm
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={() => {this.handleCreate(dispatch)}}
          wrappedComponentRef={this.saveFormRef}
          title="创建分类"
          data={title}
        />
        <Table
          rowKey={record => record.id}
          columns={columns}
          dataSource={kind}
          pagination={{
            onChange: (page) => {
              this.setState({current: page});
              dispatch({
                type: 'admin/queryKind',
                payload: page,
              })
            },
            current: this.state.current,
            total: kind_total,
            pageSize: 10,
          }}
        />
      </TableFrame>
    );
  }
}

KindManage.propTypes = {
};
function mapStateToProps(state) {
  const { kind, kind_total } = state.admin;
  return {
    kind,
    kind_total
  };
}

export default connect(mapStateToProps)(KindManage)
