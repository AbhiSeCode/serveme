import React, {useState, useContext} from 'react';
import PublicRoute from './PublicRoute';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PrivateRoute from './PrivateRoute'
import Login from '../components/Login'
import SingUp from '../components/SignUp'
import Home from '../components/Home'
// import AddingItem from '../components/AddItem'
import Menu from '../components/Menu';
import ConfirmOrder from '../components/ConfirmOrder';
import Dashboard from '../components/Dashboard';
import Profile from '../components/Profile';
import Auth from '../context/auth';
import DashboardItem from '../components/DashboardItem';
import PageNotFound from '../components/PageNotFound'



const Router = ()=>{
    const [auth, setAuth]= useState(useContext(Auth))

    return(
        <BrowserRouter>
            <Auth.Provider value={{auth, setAuth}}>
                <Switch>
                        <PublicRoute path="/" component={Home} exact={true}/>
                        <PublicRoute path= "/menu" component={Menu} exact={true}/>
                        <PublicRoute path="/login" component={Login}/>
                        <PublicRoute path="/signup" component={SingUp}/>
                        {/* <PublicRoute path= "/additem" component={AddingItem}/> */}
                        <PrivateRoute path="/user/dashboard" component={Dashboard}/>
                        <PrivateRoute path= "/user/menu" component={Menu}/>
                        <PrivateRoute path= "/user/profile" component={Profile}/>
                        <PrivateRoute path="/user/orderedItem" component={DashboardItem}/>
                        <PrivateRoute path="/user/confirmOrder" component={ConfirmOrder}/>
                        <Route component={PageNotFound}/>
                </Switch>
            </Auth.Provider>
    </BrowserRouter>
    )
}

export {Router as default}