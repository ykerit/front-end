import React from 'react';
import { connect } from 'dva';
import { Table, Popconfirm, Button } from 'antd';

const UserManage = ({userData}) => {
  const columns = [{
    title: 'id',
    dataIndex: 'user_id',
    key: 'user_id'
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
    dataIndex: 'role_id',
    key: 'role_id'
  }, {
    title: '操作',
    key:'action',
    dataIndex: 'action',
    render: (text, record) => (
      <span>
        <Button type="primary">更改</Button>
        <a> | </a>
        <Popconfirm title="Are you sure delete this task?" okText="Yes" cancelText="No">
          <Button type="danger">删除</Button>
        </Popconfirm>
      </span>
    ),
  }];

  return (
    <div>
      <Table columns={columns} dataSource={userData}/>
    </div>
  );
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