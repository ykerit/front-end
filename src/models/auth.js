import {login, register, UploadImage,
  queryUserInfo, updateCurrentUser} from '../services/auth';
import { routerRedux } from 'dva/router';
import { message, notification, Icon } from 'antd'
import { setlocalStorage, dellocalStorage, getlocalStorage } from '../utils/helper';

message.config({
  top: 200,
});


export default {
  namespace: 'auth',
  state: {
    id: '',
    name: '',
    face: '',
    signature: '',
    title: '',
    group: '',
    token: '',
    role: '',
    is_authorization: false,
    message: '',
  },
  reducers: {
    loginSuccess(state, action) {
      setlocalStorage('id', action.payload.id);
      setlocalStorage('token', action.payload.token);
      setlocalStorage('name', action.payload.name);
      return { ...state, ...action.payload, message: '登录成功' };
    },
    loginErro(state, action) {
      return { ...state, is_authorization: false, message: '登录失败'}
    },
    logoutSuccess(state){
      return { ...state, id:'', name: '',
        message:'登出成功', token: '',
        is_authorization: false, userData: []}
    },
    queryUserSuccess(state, action){
      return { ...state, ...action.payload}
    }
  },
  effects: {
    *login({ payload }, {call, put}) {
      const data = yield call(login, payload);
      if (data && data.status === 200) {
        yield put({
          type:'loginSuccess',
          payload: data
        });
        yield put(routerRedux.push('/admin'))
      } else{
        yield put({
          type: 'loginErro'
        });
        yield message.error('登录失败, 用户名或密码错误!')
      }
    },
    *logout({ payload },{ put }){
      dellocalStorage();
      console.log('logout');
      yield put(routerRedux.push('/login'));
      yield put({
        type: 'logoutSuccess'
      });
    },
    *register({ payload }, {call, put}){
      const data = yield call(register, payload);
      if (data && data.status === 200) {
        yield put({
          type:'loginSuccess',
          payload: data
        });
        yield put(routerRedux.push('/admin'))
      }else {
        yield put({
          type: 'loginErro'
        })
      }
    },
    *UploadAvatar({ payload }, {call, put}){
      const data = yield call(UploadImage, payload);
      if (data && data.status === 200){
        yield put({
          type: 'queryUserInfo',
          payload: getlocalStorage('id')
        })
      }
    },
    *queryUserInfo({ payload }, {call, put }) {
      const data = yield call(queryUserInfo, payload);
      if (data && data.status === 200) {
        yield put({
          type: 'queryUserSuccess',
          payload: data
        })
      }else {
        yield put({
          type: 'loginErro'
        });
        const args = {
          message: '登出通知',
          description: '登录信息已经过期啦，请及时登录， 解锁更多姿势!',
          icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
        };
        yield notification.open(args);
        yield put(routerRedux.push('/blank'));
        yield put(routerRedux.push('/'));
        dellocalStorage();
      }
    },
    *updateCurrentUser({ payload }, {call, put }) {
      const data = yield call(updateCurrentUser, payload);
      if (data && data.status === 200) {
        yield put({
          type: 'queryUserInfo',
          payload: data.id
        });
        yield message.success('更新成功!')
      } else {
        yield message.error('更新信息失败!')
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
      });
  },
  },
}
