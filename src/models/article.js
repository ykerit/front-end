import {createArticle, queryAllArticle, queryArticle, createComment, queryComment} from "../services/article";

export default {
  namespace: 'article',
  state: {
    articleList: [],
    articleContent: [],
    comment: [],
    total: null,
    comment_total: null,
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
    *queryComment({ payload }, {call, put}){
      const data = yield call(queryComment, payload);
      if (data && data.status === 200){
        yield put({
          type: 'querySuccess',
          payload:data
        })
      }
    },
    *createArticle({ payload }, {call, put}){
      const data = yield call(createArticle, payload);
      if (data && data.status === 200){
        yield  put({
          type: 'queryAllArticle',
          payload: 1,
        })
      }
    },
    *createComment({ payload }, {call, put}){
      const data = yield call(createComment, payload);
      if (data && data.status === 200){
        yield put({
          type: 'queryComment',
          payload: {article: 1, page_size: 1},
        })
      }
    }
  },
  subscribtions: {

  },
}
