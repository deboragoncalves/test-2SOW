import { createStore } from 'redux'

/* reducers
Quando for disparada a ação, o objeto item do state vai receber o que a função estiver recebendo por parâmetro */

const initialState = { item: {}, redirectForm: false }

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SEND_ITEM_LIST':
        return { ...state, item: action.item, redirectForm: action.redirectForm }
      default:
        return state;
    }
};
  
// store

export const store = createStore(reducer);
