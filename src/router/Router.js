import React, {useState, useContext} from 'react';
import PublicRoute from './PublicRoute';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PrivateRoute from './PrivateRoute'
import Login from '../components/Login'
import SingUp from '../components/SignUp'
import Home from '../components/Home'
import Menu from '../components/Menu';
import ConfirmOrder from '../components/ConfirmOrder';
import Dashboard from '../components/Dashboard';
import Profile from '../components/Profile';
import Auth from '../context/auth';
import DashboardItem from '../components/DashboardItem';
import PageNotFound from '../components/PageNotFound';
import Footer from '../components/Footer';
import ForgetPassword from '../components/ForgetPassword';
import ResetPassword from '../components/ResetPassword';



const Router = ()=>{
    const [auth, setAuth]= useState(useContext(Auth))

    return(
        <BrowserRouter>
            <Auth.Provider value={{auth, setAuth}}>
                <Switch>
                        <PublicRoute path="/" component={Home} exact={true}/>
                        <PublicRoute path= "/menu" component={Menu} exact={true}/>
                        <PublicRoute path="/login" component={Login}/>
                        <PublicRoute path="/forgetpassword" component={ForgetPassword} exact={true}/>
                        <PublicRoute path="/signup" component={SingUp}/>
                        <PrivateRoute path="/user/dashboard" component={Dashboard}/>
                        <PrivateRoute path= "/user/menu" component={Menu}/>
                        <PrivateRoute path= "/user/profile" component={Profile}/>
                        <PrivateRoute path="/user/orderedItem" component={DashboardItem}/>
                        <PrivateRoute path="/user/confirmOrder" component={ConfirmOrder}/>
                        <Route path="/reset/:token" component={ResetPassword} exact={true}/>
                        <Route component={PageNotFound}/>
                </Switch>
                <Footer/>
            </Auth.Provider>
    </BrowserRouter>
    )
}

export {Router as default}