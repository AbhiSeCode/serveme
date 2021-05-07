import React, { useEffect } from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux'

const PublicRoutes = ({...props}) =>{
    const {token, role} = useSelector(state => state.auth)
   useEffect(()=>{
    if(props.path === '/'){
        document.title = 'Serve Me'
    }else{
        document.title = `${props.component.name} - Serve Me`
    }
   },[props])


    if(token && role){
        if(role === "user"){
            return <Redirect to="/user/menu"/>
        }else {
            return <Redirect to= "/orders"/>
        }
    }
    else{
        return(
            <Route {...props}/>
        )
    }
}

export {PublicRoutes as default}