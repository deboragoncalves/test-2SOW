export default {
    sendItemList(item) {
        return { type: 'SEND_ITEM_LIST', payload: item }
    }
}

/* Função que será executada e enviada pra o Reducer */