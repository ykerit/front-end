import { routerRedux } from 'dva/router';
import { checklocalStorage } from '../utils/helper';

export default {
  namespace: 'admin',
  state: {

  },
  reducers: {

  },
  effects: {
    
  },
  subscribtions:{
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
