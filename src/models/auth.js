import { login, queryAll } from '../services/auth';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'auth',
  state: {
    token: {},
    isLogined: false,
    message: '',
    userData:[]
  },
  reducers: {
    loginSuccess(state, action) {
      return { ...state, ...action.payload, isLogined: true };
    },
    loginErro(state, action) {
      return { ...state, ...action.payload, message: '登录失败'}
    },
    querySuccess(state, action){
      return { ...state, ...action.payload}
    }
  },
  effects: {
    *login({ payload }, {call, put}) {
      const data = yield call(login, payload)
      if (data && data.status === 100) {
        yield put({
          type:'loginSuccess',
          payload:{
            token: data.token,
          }
        })
      } else{
        yield put({
          type: 'loginErro'
        })
      }
    },

    *queryAll({ payload }, {call, put}){
      const data = yield call(queryAll, payload)
      if (data && data.status === 100) {
        yield put({
          type: 'querySuccess',
          payload: {
            userData: data.user,
          }
        })
      }
    },

    *link({put}){
      yield put(routerRedux.push('/admin'));
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({pathname}) => {
        if (pathname === '/admin') {
          dispatch({
            type: 'queryAll',
          })
        }
      })
    },
  },
}