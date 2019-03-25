// 菜单选择
export const selectTagList = isAdmin => {
  const menuSourceByadmin = [{
    key: 'personal-center',
    type: 'user',
    name: '个人中心',
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
    key: 'user-analysis',
    type: 'bar-chart',
    name: '用户分析',
    child: null
  }];

  const menuSourceByUser = [{
    key: 'personal-center',
    type: 'user',
    name: '个人中心',
    child: null
  },{
    key: 'article',
    type: 'profile',
    name: '文章管理',
    child: null
  },{
    key: 'kind',
    type: 'database',
    name: '分类管理',
    child: null
  },{
    key: 'user-analysis',
    type: 'bar-chart',
    name: '用户分析',
    child: null
  }];
  if (isAdmin === 1) {
    return menuSourceByadmin;
  } else {
    return menuSourceByUser;
  }
};
