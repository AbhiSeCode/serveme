import {combineReducers} from 'redux'
import menuReducer from './menuReducer'
import authReducer from './authReducer'

const reducer = combineReducers({
    menu: menuReducer,
    auth: authReducer
})

export {reducer as default}