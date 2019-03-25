import React, { Component } from 'react';
import { connect } from 'dva';
import { Table } from 'antd';
import TableFrame from '../../layout/table-frame/table-frame';

class OpLog extends Component{
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
      payload: {type: 'opLog', pageSize: 1}
    });
  }

  render(){

    const { OpLog, op_total, dispatch } = this.props;

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
    }, {
      title: '原因',
      dataIndex: 'reason',
      key: 'reason'
    }];

    return (
        <TableFrame>
          <Table
            rowKey={record => record.id}
            columns={columns}
            dataSource={OpLog}
            pagination={{
              onChange: (page) => {
                this.setState({current: page});
                dispatch({
                  type: 'admin/queryLog',
                  payload: {type: 'opLog', pageSize: page},
                })
              },
              current: this.state.current,
              total: op_total,
              pageSize: 10,
            }}
          />
        </TableFrame>
    );
  }
}

OpLog.propTypes = {
};
function mapStateToProps(state) {
  const { OpLog, op_total } = state.admin;
  return {
    OpLog,
    op_total
  };
}

export default connect(mapStateToProps)(OpLog)
