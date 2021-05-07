import React from 'react';
import PublicRoute from './PublicRoute';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PrivateRoute from './PrivateRoute'
import ContactUs from '../components/ContactUs'
import Home from '../components/Home'
import Menu from '../components/Menu';
import PageNotFound from '../components/PageNotFound';
import Footer from '../components/Footer';
import ForgotPassword from '../components/ForgotPassword';
import ResetPassword from '../components/ResetPassword';
import { Header } from '../components/Header';
import AllOrders from '../components/AllOrders';
import EmployeeMenu from '../components/EmployeeMenu'
import Employees from '../components/Employees';



const Router = ()=>{
    return(
        <BrowserRouter>
                <Header/>
                <Switch>
                    <PublicRoute path="/" component={Home} exact={true}/>
                    <PrivateRoute path="/orders" component={AllOrders} exact={true}/>
                    <PublicRoute path= "/menu" component={Menu} exact={true}/>
                    <PublicRoute path="/contactus" component={ContactUs} exact={true}/>
                    <PrivateRoute path= "/user/menu" component={Menu} exact={true}/>
                    <PrivateRoute path= "/employee/menu" component={EmployeeMenu} exact={true}/>
                    <PrivateRoute path="/employees" component={Employees} exact={true}/>
                    <Route path="/reset/:token" component={ResetPassword} exact={true}/>
                    <PublicRoute path="/forgotpassword" component={ForgotPassword} exact={true}/>
                    <Route component={PageNotFound}/>
                </Switch>
                <Footer/>
        </BrowserRouter>
    )
}

export {Router as default}