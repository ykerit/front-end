import { routerRedux } from 'dva/router';
import { checklocalStorage } from '../utils/helper';
import {queryLog} from '../services/logger';
import {
  queryKind, queryTag, createKind,
  createTag, delKind, delTag,
  queryPermission, createPermission, delPermission
} from '../services/admin'

export default {
  namespace: 'admin',
  state: {
    AdminLog: [],
    adminLog_total: null,
    OpLog: [],
    op_total: null,
    UserLog: [],
    userLog_total: null,
    tag: [],
    tag_total: null,
    kind: [],
    kind_total: null,
    permission: [],
    permission_total: null,
  },
  reducers: {
    querySuccess(state, action){
      return { ...state, ...action.payload};
    },
  },
  effects: {
    *queryLog({ payload }, {call, put}){
      const data = yield call(queryLog, payload);
      if (data && data.status === 200) {
        yield put({
          type:'querySuccess',
          payload: data
        })
      }
    },
    *queryKind({ payload }, {call, put}){
      const data = yield call(queryKind, payload);
      if (data && data.status === 200) {
        yield put({
          type: 'querySuccess',
          payload: data
        })
      }
    },
    *queryTag({ payload }, {call, put}){
      const data = yield call(queryTag, payload);
      if (data && data.status === 200) {
        yield put({
          type: 'querySuccess',
          payload: data
        })
      }
    },
    *queryPermission({ payload }, {call, put}){
      const data = yield call(queryPermission, payload);
      if (data && data.status === 200) {
        yield put({
          type: 'querySuccess',
          payload: data
        })
      }
    },
    *createKind({ payload }, {call, put}){
      const data = yield call(createKind, payload);
      if (data && data.status === 200){
        yield put({
          type: 'queryKind',
          payload: 1
        })
      }
    },
    *createTag({ payload }, {call, put}){
      const data = yield call(createTag, payload);
      if (data && data.status === 200){
        yield put({
          type: 'queryTag',
          payload: 1
        })
      }
    },
    *createPermission({ payload }, {call, put}){
      const data = yield call(createPermission, payload);
      if (data && data.status === 200){
        yield put({
          type: 'queryPermission',
          payload: 1
        })
      }
    },
    *delKind({ payload }, {call, put}){
      const data = yield call(delKind, payload);
      if (data && data.status === 200){
        yield put({
          type: 'queryKind',
          payload: 1
        })
      }
    },
    *delTag({ payload }, {call, put}){
      const data = yield call(delTag, payload);
      if (data && data.status === 200){
        yield put({
          type: 'queryTag',
          payload: 1
        })
      }
    },
    *delPermission({ payload }, {call, put}){
      const data = yield call(delPermission, payload);
      if (data && data.status === 200){
        yield put({
          type: 'queryPermission',
          payload: 1
        })
      }
    },
  },
  subscriptions:{
    setup({ dispatch, history }) {
      history.listen(location => {
          if (location.pathname === '/admin') {
            if (checklocalStorage) {

            } else {
              routerRedux.push('/login');
            }
          }
      });
  },
  },
}
