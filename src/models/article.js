
export default {
  namespace: 'article',
  state: {
    content: '',
    display: false,
  },
  reducers: {
    reflash(state, action) {
      return { ...state, content: action.payload }
    },
    reflash_display(state, action){
      return { ...state, display:action.payload}
    }
  },
  effects: {

  },
  subscribtions: {

  },
}