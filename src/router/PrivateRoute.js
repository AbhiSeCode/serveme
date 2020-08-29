import React, { useContext, useState} from 'react';
import {NavLink, Link, Route, Redirect} from 'react-router-dom';
import Auth from '../context/auth';
import Cookies from 'js-cookie';
import axios from 'axios';

const PrivateRoutes = (props) =>{

    const [flag, setFlag] = useState(true)
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

    const toggle=()=>{
        setFlag(!flag)
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
                <Link to="/user/dashboard" className="header__logo">
                    <img className="header__image" src="/img/logo.png"  alt="turun "/>
                </Link>
                <div className="header__mobile">
                    <img className="header__bar" src="/img/menu(1).png" alt="menu-bar" onClick={toggle}/>
                    <div className={flag ? "header__nav header__nav--show" :"header__nav"} >
                        <NavLink to="/user/dashboard" activeClassName="header__active" className="header__link" >Dashboard</NavLink>
                        <NavLink to="/user/menu" activeClassName="header__active" className="header__link">Menu</NavLink>
                        <NavLink to="/user/profile" activeClassName="header__active" className="header__link">Profile</NavLink>
                    <button className="header__button" onClick={logout}>Logout</button>
                    </div>
                </div>
            </div>
        )
    }
   
    return(
            <div className="page">
                <Header/>
                <Route {...props}/>
            </div>
    )}
}


export {PrivateRoutes as default}