import React from 'react';
import { connect } from 'dva';
import CpuUse from './chart-component/cpu-use';

function UserInfo() {
  return (
    <div>
      <CpuUse/>
    </div>
  );
}

export default connect()(UserInfo)
