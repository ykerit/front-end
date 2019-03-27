import React, { Component } from 'react';
import { connect } from 'dva';
import { Table } from 'antd';
import TableFrame from '../../layouts/TableFrame/TableFrame'

class AdminLog extends Component{
  state = {
    current: null
  };

  handleDelete = (key, dispatch) => {
    dispatch({
      type: 'auth/delAdmin',
      payload: key,
    })
  };
  componentDidMount(){
    this.props.dispatch({
      type: 'admin/queryLog',
      payload: {type: 'adminLog', pageSize: 1}
    });
  }

  render(){

    const { AdminLog, adminLog_total, dispatch } = this.props;

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
      title: 'IP',
      dataIndex: 'ip',
      key: 'ip'
    }];

    return (
      <TableFrame>
        <Table
          rowKey={record => record.id}
          columns={columns}
          dataSource={AdminLog}
          pagination={{
            onChange: (page) => {
              this.setState({current: page});
              dispatch({
                type: 'admin/queryLog',
                payload: {type: 'adminLog', pageSize: page},
              })
            },
            current: this.state.current,
            total: adminLog_total,
            pageSize: 10,
          }}
        />
      </TableFrame>
    );
  }
}

AdminLog.propTypes = {
};
function mapStateToProps(state) {
  const { AdminLog, adminLog_total } = state.admin;
  return {
    AdminLog,
    adminLog_total
  };
}

export default connect(mapStateToProps)(AdminLog)
