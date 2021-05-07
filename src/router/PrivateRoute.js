import React,{useEffect} from 'react';
import { Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux'

const PrivateRoutes = (props) =>{

    const {token} = useSelector(state => state.auth)

    useEffect(()=>{
        document.title = `${props.component.name} - Serve Me`
    },[props])

    if(!token){
        return (
            <Redirect to="/"/>
        )
    }
    else{
        return(
            <Route {...props}/>
        )}
}


export {PrivateRoutes as default}