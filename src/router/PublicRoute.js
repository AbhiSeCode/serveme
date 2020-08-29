import React, { useContext, useState } from 'react';
import {NavLink, Link, Route, Redirect} from 'react-router-dom';
import Auth from '../context/auth';

const PublicRoutes = ({...props}) =>{
    const [flag, setFlag] = useState(true)
    const {auth}= useContext(Auth)
    const toggle=()=>{
        setFlag(!flag)
    }
    if(auth){
        return <Redirect to="/user/dashboard"/>
    }
    else{
    const Header= ()=>{
        return (
            <div className="header">
                <Link to="/" className="header__logo">
                    <img className="header__image" src="/img/logo.png"  alt="turun "/>
                </Link>
                <div className="header__mobile">
                    <img className="header__bar" src="/img/menu(1).png" alt="menu-bar" onClick={toggle}/>
                    <div className={flag ? "header__nav header__nav--show" :"header__nav"} >
                        <NavLink to="/" activeClassName="header__active" className="header__link" exact={true}>Home</NavLink>
                        <NavLink to="/menu" activeClassName="header__active" className="header__link">Menu</NavLink>
                        <NavLink to="/login" activeClassName="header__active" className="header__link">Login</NavLink>
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
    
    )
    }
}

export {PublicRoutes as default}