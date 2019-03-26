// 菜单选择
export const selectTagList = isAdmin => {
  const menuSourceByadmin = [{
    key: 'VisitorAnalysis',
    type: 'bar-chart',
    name: '访客分析',
    child: null
  },{
    key: 'user-management',
    type: 'team',
    name: '用户管理',
    child: [{
      key: 'admin',
      type: 'contacts',
      name: '管理员管理'
    },{
      key: 'user',
      type: 'user',
      name: '用户管理'
    },{
      key: 'role',
      type: 'man',
      name: '角色管理'
    }]
  },{
    key: 'article',
    type: 'profile',
    name: '文章管理',
    child: null
  },{
    key: 'permission',
    type: 'warning',
    name: '权限管理',
    child: null
  },{
    key: 'kind',
    type: 'database',
    name: '分类管理',
    child: null
  },{
    key: 'log',
    type: 'info-circle',
    name: '日志管理',
    child: [{
      key: 'admin-log',
      type: 'user',
      name: '管理员日志'
    },{
      key: 'user-log',
      type: 'team',
      name: '用户日志'
    },{
      key: 'tool',
      type: 'tool',
      name: '操作日志'
    }]
  },{
    key: 'Account',
    type: 'user',
    name: '个人中心',
    child: [{
      key: 'UserCenter',
      type: 'user',
      name: '个人中心'
    },{
      key: 'UserSetting',
      type: 'setting',
      name: '个人设置'
    }]
  }];

  const menuSourceByUser = [{
    key: 'Account',
    type: 'user',
    name: '个人',
    child: [{
      key: 'UserCenter',
      type: 'user',
      name: '个人中心'
    },{
      key: 'UserSetting',
      type: 'setting',
      name: '个人设置'
    }]
  },{
    key: 'VisitorAnalysis',
    type: 'bar-chart',
    name: '访客分析',
    child: null
  },{
    key: 'kind',
    type: 'database',
    name: '分类管理',
    child: null
  }];
  if (isAdmin === 1) {
    return menuSourceByadmin;
  } else {
    return menuSourceByUser;
  }
};
