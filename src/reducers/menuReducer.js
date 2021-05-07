const menuState = {
    data: [],
    items: [],
    order: []
}
 const menuReducer = (state = menuState, action ) =>{
     switch(action.type){
        case 'GET_DATA':
            return {...state, items : action.data, data: action.data}

        case 'SELECT_ITEM':
            return {...state, items : state.items.map((item) => {
                if(item._id === action.selectedItem._id){
                    item.selected = true
                    item.quantity = 1
                    return item
                }
                else return item
            }) ,order: state.order.concat(action.selectedItem)}

        case 'DESELECT_ITEM':
            return {...state,items : state.items.map((item) => {
                if(item._id === action.selectedItem._id){
                    item.selected = false
                    item.quantity= 0
                    return item
                }
                else return item
            }) ,order: state.order.filter((item)=>item._id  !== action.selectedItem._id)}

        case 'SEARCH_ITEM':
            return {...state, items :state.data.filter((item)=>item.name.toLowerCase().includes(action.search.toLowerCase()))}

        case 'ADD_QUANTITY': 
            return {...state, order: state.order.map((food) => {
                    if(action.item._id === food._id){
                        if(food.quantity < 10){
                            food.quantity += 1
                        }
                        return food
                    }
                    else return food
                })}

        case 'MINUS_QUANTITY': 
            return {...state, order: state.order.map((food) => {
                    if(action.item._id === food._id){
                        if(food.quantity > 1){
                            food.quantity -= 1
                        }
                        return food
                    }
                    else return food
                })}
        case 'CLEAR_STATES': 
            return {order: [], items: [], data:[]  }

        case 'FINAL_ORDER':
            return {...state, order: state.order.map(item=> ({id: item.id, quantity: item.quantity}))}
        default:
            return state
    }
}

export {menuReducer as default}