import { queryAllClass } from "../services/kind";

export default {
  namespace: 'kind',
  state: {
    classification: [],
  },
  reducers: {
    querySuccess(state, action){
      return { ...state, ...action.payload}
    },
  },
  effects: {
    *queryAllClass({ payload }, {call, put}){
      const data = yield call(queryAllClass, payload);
      if (data && data.status === 200){
        yield put({
          type: 'querySuccess',
          payload: data
        })
      }
    },
  },
  subscribtions: {

  },
}
