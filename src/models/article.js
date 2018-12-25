import {createArticle, queryAllArticle, queryArticle} from "../services/article";

export default {
  namespace: 'article',
  state: {
    articleList: [],
    articleContent: [],
  },
  reducers: {
    querySuccess(state, action){
      return { ...state, ...action.payload}
    },
  },
  effects: {
    *queryAllArticle({ payload }, {call, put}){
      const data = yield call(queryAllArticle, payload);
      if (data && data.status === 200){
        yield put({
          type: 'querySuccess',
          payload: data
        })
      }
    },
    *queryArticleById({ payload }, {call, put}){
      const data = yield call(queryArticle, payload);
      if (data && data.status === 200){
        yield put({
          type: 'querySuccess',
          payload: data
        })
      }
    },
    *createArticle({ payload }, {call, put}){
      const data = yield call(createArticle, payload);
      if (data && data.status === 200){
        yield  put({
          type: 'queryAllArticle',
          payload: 0,
        })
      }
    },
  },
  subscribtions: {

  },
}
