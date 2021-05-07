
const getData = (data) =>{
    return {
        type: 'GET_DATA',
        data
    }
}

const selectItem =(selectedItem) =>{
    return {
        type: 'SELECT_ITEM',
        selectedItem
    }
}

const deselectItem =(selectedItem) =>{
    return {
        type: 'DESELECT_ITEM',
        selectedItem
    }
}

const searchItem = (search) =>{
    return {
        type: 'SEARCH_ITEM',
        search
    }
}

const clearState = () =>{
    return {
        type: 'CLEAR_STATES'
    }
}

const finalOrder = ()=>{
    return {
        type: 'FINAL_ORDER'
    }
}

const addQuantity = (item)=>{
    return {type: 'ADD_QUANTITY', item}
}

const minusQuantity = (item)=>{
    return {type: 'MINUS_QUANTITY', item}
}


export {getData, selectItem, deselectItem, searchItem, addQuantity, minusQuantity, clearState, finalOrder}