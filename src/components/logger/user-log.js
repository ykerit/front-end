import React, { Component } from 'react';
import { connect } from 'dva';
import { Table } from 'antd';

class UserLog extends Component{

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
      payload: {type: 'userLog', pageSize: 1}
    });
  }

  render(){

    const { UserLog, userLog_total, dispatch } = this.props;

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
      <div>
        <Table
          rowKey={record => record.id}
          columns={columns}
          dataSource={UserLog}
          pagination={{
            onChange: (page) => {
              this.setState({current: page});
              dispatch({
                type: 'admin/queryLog',
                payload: {type: 'userLog', pageSize: page},
              })
            },
            current: this.state.current,
            total: userLog_total,
            pageSize: 10,
          }}
        />
      </div>
    );
  }
}

UserLog.propTypes = {
};
function mapStateToProps(state) {
  const { UserLog, userLog_total } = state.admin;
  return {
    UserLog,
    userLog_total
  };
}

export default connect(mapStateToProps)(UserLog)
