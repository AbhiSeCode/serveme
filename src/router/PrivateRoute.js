import React, { useContext } from 'react';
import {NavLink, Link, Route, Redirect} from 'react-router-dom';
import Auth from '../context/auth';
import Cookies from 'js-cookie';
import axios from 'axios';

const PrivateRoutes = (props) =>{
    const {auth, setAuth}= useContext(Auth)
    const logout = () =>{
        axios.delete('/user/logout', {headers: {
            'Authorization' : `Bearer ${Cookies.get('token')}`
            }})
        .then(()=>{
            setAuth(false)
            Cookies.remove('token')
        })
        .catch(console.log)
    }
    if(!auth){
        return (
            <Redirect to="/login"/>
        )
    }
    else{
    const Header= ()=>{
        return (
            <div className="header">
                <div className="header__logo">
                    <Link to="/dashboard">
                        <img className="header__image" src="/img/logo.png"  alt="turun "/>
                        </Link>
                </div>
                <div className="header__nav">
                    <NavLink to="/user/dashboard" activeClassName="header__active" className="header__link" >Dashboard</NavLink>
                    <NavLink to="/user/menu" activeClassName="header__active" className="header__link">Menu</NavLink>
                    <NavLink to="/user/profile" activeClassName="header__active" className="header__link">Profile</NavLink>
                <button onClick={logout}>Logout</button>
                </div>
            </div>
        )
    }
    return(
            <div>
                <Header/>
                <Route {...props}/>
            </div>
    )}
}


export {PrivateRoutes as default}