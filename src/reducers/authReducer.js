import Cookie from 'js-cookie'

const authState = {
    token: Cookie.get('token'),
    role: Cookie.get('role')
}

const authReducer = (state= authState, action)=>{
    switch(action.type){
        case "LOGIN":
            Cookie.set('token', action.token, { expires: 30 })
            Cookie.set('role', action.role , { expires: 30 })
            return {...state, token: action.token, role: action.role}

        case "LOGOUT":
            Cookie.remove('token')
            Cookie.remove('role')
            return {...state, token: '', role: ''}  
        default: 
            return state
        
    }
}


export {authReducer as default}