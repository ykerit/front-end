import {login, queryUser, createRole, queryRole,
  queryAdmin, createAdmin, createUser, delUser, delAdmin, delRole} from '../services/auth';
import { routerRedux } from 'dva/router';
import { setlocalStorage, dellocalStorage } from '../utils/helper';


export default {
  namespace: 'auth',
  state: {
    token: '',
    is_authorization: false,
    name: '',
    message: '',
    userData: [],
    roleData: [],
    adminData: [],
  },
  reducers: {
    loginSuccess(state, action) {
      return { ...state, ...action.payload, message: '登录成功' };
    },
    loginErro(state, action) {
      return { ...state, ...action.payload, message: '登录失败'}
    },
    logout(state){
      dellocalStorage('token');
      routerRedux.push('/login');
      return { ...state, name: '', message:'登出成功', token: '', is_authorization: false,
    userData: []}
    },
    querySuccess(state, action){
      return { ...state, ...action.payload}
    },
  },
  effects: {
    *login({ payload }, {call, put}) {
      const data = yield call(login, payload);
      if (data && data.status === 200) {
        setlocalStorage('token', data.token);
        yield put({
          type:'loginSuccess',
          payload: data
        });
        yield put(routerRedux.push('/admin'))
      } else{
        yield put({
          type: 'loginErro'
        })
      }
    },
    *queryUsers({ payload },{call, put}){
      const data = yield call(queryUser, payload);
      console.log(data);
      if (data && data.status === 200) {
        yield put({
          type: 'querySuccess',
          payload: {
            userData: data.user,
          }
        })
      }
    },
    *queryRoles({ payload }, {call, put}){
      const data = yield call(queryRole, payload);
      if (data && data.status === 200){
        yield  put({
          type: 'querySuccess',
          payload: {
            roleData: data.role,
          }
        })
      }
    },
    *queryAdmins({ payload }, {call, put}){
      const data = yield call(queryAdmin, payload);
      console.log(data);
      if (data && data.status === 200){
        yield put({
          type: 'querySuccess',
          payload: {
            adminData: data.admin,
          }
        })
      }
    },
    *createRole({ payload }, {call, put}){
      const data = yield call(createRole, payload);
      if (data && data.status === 200){
        yield put({
          type: 'queryRoles'
        })
      }
    },
    *createAdmin({ payload }, {call, put}){
      const data = yield call(createAdmin, payload);
      if (data && data.status === 200){
        yield put({
          type: 'queryAdmins'
        })
      }
    },
    *createUser({ payload }, {call, put}){
      const data = yield call(createUser, payload);
      if (data && data.status === 200){
        yield put({
          type: 'queryUsers'
        })
      }
    },
    *delUser({ payload }, {call, put}){
      const data = yield call(delUser, payload);
      if (data && data.status === 200){
        yield put({
          type: 'queryUsers'
        })
      }
    },

    *delAdmin({ payload }, {call, put}){
      const data = yield call(delAdmin, payload);
      if (data && data.status === 200){
        yield put({
          type: 'queryAdmins'
        })
      }
    },

    *delRole({ payload }, {call, put}){
      const data = yield call(delRole, payload);
      if (data && data.status === 200){
        yield put({
          type: 'queryRoles'
        })
      }
    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
      });
  },
  },
}
