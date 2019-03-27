import {createArticle, queryAllArticle, queryArticle,
  createComment, queryComment, queryTimeLine, delArticle,
queryCurrentUserArticle} from "../services/article";
import { getlocalStorage } from '../utils/helper';

export default {
  namespace: 'article',
  state: {
    articleList: [],
    articleContent: [],
    currentUserList: [],
    currentUserList_total: 0,
    comment: [],
    timeline: [],
    total: null,
    comment_total: null,
  },
  reducers: {
    querySuccess(state, action){
      return { ...state, ...action.payload}
    },
    queryArticleSuccess(state, { payload }){
      return {...state,
        articleList: state.articleList.concat(payload.articleList),
      total: payload.total}
    },
    queryCurrentUserArticleSuccess(state, { payload }){
      return {...state,
        currentUserList: state.currentUserList.concat(payload.currentUserList),
        currentUserList_total: payload.currentUserList_total}
    }
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
    *appendArticle({ payload }, {call, put}){
      const data = yield call(queryAllArticle, payload);
      if (data && data.status === 200){
        yield put({
          type: 'queryArticleSuccess',
          payload: Array.isArray(data.articleList) ? data : [],
        })
      }
    },
    *queryCurrentUserArticle({payload}, {call, put}){
      const data = yield call(queryCurrentUserArticle, payload);
      if (data && data.status === 200){
        yield put({
          type: 'querySuccess',
          payload: Array.isArray(data.currentUserList) ? data : [],
        })
      }
    },
    *appendCurrentUserArticle({ payload }, {call, put}){
      const data = yield call(queryCurrentUserArticle, payload);
      if (data && data.status === 200){
        yield put({
          type: 'queryCurrentUserArticleSuccess',
          payload: Array.isArray(data.currentUserList) ? data : [],
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
    *queryTimeLine({ payload }, {call, put}) {
      const data = yield call(queryTimeLine, payload);
      if (data && data.status === 200) {
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
    *deleteArticle({ payload }, { call, put }) {
      const data = yield call(delArticle, payload);
      if (data && data.status === 200){
        yield  put({
          type: 'queryAllArticle',
          payload: 1,
        });
        yield  put({
          type: 'queryCurrentUserArticle',
          payload: {id: getlocalStorage('id'), page_size: 1},
        })
      }
    },
    *createComment({ payload }, {call, put}){
      const data = yield call(createComment, payload);
      if (data && data.status === 200){
        yield put({
          type: 'queryComment',
          payload: {article: payload.article_id, page_size: 1},
        })
      }
    }
  },
  subscribtions: {

  },
}
