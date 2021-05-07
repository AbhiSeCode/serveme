const login=(token, role)=>{
    return {
        type: 'LOGIN',
        token,
        role
    }
}


const logout = ()=>{
    return {
        type: 'LOGOUT'
    }
}


export {login ,logout}