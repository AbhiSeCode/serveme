import React, { useContext } from 'react';
import {NavLink, Link, Route, Redirect} from 'react-router-dom';
import Auth from '../context/auth';

const PublicRoutes = ({...props}) =>{
    const {auth}= useContext(Auth)
    if(auth){
        return <Redirect to="/user/dashboard"/>
    }
    else{
    const Header= ()=>{
        return (
            <div className="header">
                <div className="header__logo">
                    <Link to="/">
                        <img className="header__image" src="/img/logo.png"  alt="turun "/>
                        </Link>
                </div>
                <div className="header__nav">
                    <NavLink to="/" activeClassName="header__active" className="header__link" exact={true}>Home</NavLink>
                    <NavLink to="/menu" activeClassName="header__active" className="header__link">Menu</NavLink>
                    <NavLink to="/login" activeClassName="header__active" className="header__link">Login</NavLink>
                </div>
            </div>
        )
    }
    return(
        <div>
            <Header/>
            <Route {...props}/>
        </div>
    
    )
    }
}

export {PublicRoutes as default}