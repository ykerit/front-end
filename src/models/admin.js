
export default {
  namespace: 'admin',
  state: {
    chooseMenu:null,
  },
  reducers: {
    changeChoose(state, action){
      return { ...state, chooseMenu:action.payload }
    }
  },
  effects: {

  },
  subscribtions:{

  },
}