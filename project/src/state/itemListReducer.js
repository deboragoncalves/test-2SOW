const initialState = { item: {} }

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SEND_ITEM_LIST':
            return { ...state, item: action.payload }
        default:
            return state
    }
}

/* 
- Reducer: cada dado da store tem o seu próprio reducer. Possui as ações/alterações
- Action (mutations - vuex): envia um dado ao reducer. ]
- Type: nome da ação. Payload: dado a ser enviado
- Um arquivo de ações para cada reducer.
- Provider: indica qual store será utilizada na aplicação.
- Connect: mapStateToProps (conecta state do store ao componente do react). 
-          mapDispatchToProps (conecta a action ao componente do react)
*/