import {queryUser, createRole, queryRole,
  queryAdmin, createAdmin, createUser, delUser,
  delAdmin, delRole} from '../services/auth';

export default {
  namespace: 'user',
  state: {
    userData: [],
    roleData: [],
    adminData: [],
    admin_total: null,
    user_total: null
  },
  reducers: {
    querySuccess(state, action){
      return { ...state, ...action.payload}
    },
  },
  effects: {
    *queryUsers({ payload },{call, put}){
      const data = yield call(queryUser, payload);
      if (data && data.status === 200) {
        yield put({
          type: 'querySuccess',
          payload: data
        })
      }
    },
    *queryRoles({ payload }, {call, put}){
      const data = yield call(queryRole, payload);
      if (data && data.status === 200){
        yield  put({
          type: 'querySuccess',
          payload: data
        })
      }
    },
    *queryAdmins({ payload }, {call, put}){
      const data = yield call(queryAdmin, payload);
      if (data && data.status === 200){
        yield put({
          type: 'querySuccess',
          payload: data
        })
      }
    },
    *createRole({ payload }, {call, put}){
      const data = yield call(createRole, payload);
      if (data && data.status === 200){
        yield put({
          type: 'queryRoles',
        })
      }
    },
    *createAdmin({ payload }, {call, put}){
      const data = yield call(createAdmin, payload);
      if (data && data.status === 200){
        yield put({
          type: 'queryAdmins',
          payload: 1
        })
      }
    },
    *createUser({ payload }, {call, put}){
      const data = yield call(createUser, payload);
      if (data && data.status === 200){
        yield put({
          type: 'queryUsers',
          payload: 1
        })
      }
    },
    *delUser({ payload }, {call, put}){
      const data = yield call(delUser, payload);
      if (data && data.status === 200){
        yield put({
          type: 'queryUsers',
          payload: 1
        })
      }
    },

    *delAdmin({ payload }, {call, put}){
      const data = yield call(delAdmin, payload);
      if (data && data.status === 200){
        yield put({
          type: 'queryAdmins',
          payload: 1
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
