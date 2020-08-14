import React, { useEffect, useState } from 'react';
import LoadingModal from './LoadingModal';
import Cookies from 'js-cookie';
import moment from 'moment';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';


const Dashboard= ()=>{
    const [orders, setOrders]= useState([])
    const [msg, setMsg]= useState('')
    const history= useHistory()

    const settingPage= ()=>{
        if(!Cookies.get('token')){
            history.push('/login')
        }
        if(Cookies.get('order')){
            const order= JSON.parse(Cookies.get('order'))
            Cookies.remove('order')
            history.push({pathname: '/user/confirmOrder', state: order})
        }
        else{
            const getOrders= async() =>{
                await axios.get('/user/dashboard', {
                    headers:{
                    'Authorization' : `Bearer ${Cookies.get('token')}`
                    }
                })
                .then(res=>setOrders(res.data.reverse()))
                .catch(err=>setMsg(err.response.data))
        }
        setTimeout(getOrders, 500)}
    }
    useEffect(settingPage,[])
    
    if(orders.length === 0 && msg === ''){
        return  <LoadingModal/>
    }
    else{
        return (
            <div className="page">
                <h1 className="page__title">Dashboard</h1>
                <div className="order-header">
                    <div>Order ID</div>
                    <div>Time</div>
                </div>
                {msg? <p className="page__msg">{msg}</p>:<div>
                {orders.map((order)=>
                <Link to={{pathname: "/user/orderedItem", data: order}} className="order-detail" key={order._id}>
                    <div>{order._id}</div> 
                    <div>{moment.unix(order.timestamp).format('DD/MM/YYYY h:mm:ss')}</div>
                </Link>
                )}</div>}
            </div>
            
        )
    }
}

export {Dashboard as default}