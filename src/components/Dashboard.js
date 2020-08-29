import React, { useEffect, useState, useContext } from 'react';
import LoadingModal from './LoadingModal';
import Cookies from 'js-cookie';
import moment from 'moment';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import sweet from 'sweetalert2';
import Auth from '../context/auth';


const Dashboard= ()=>{
    const [orders, setOrders]= useState([])
    const history= useHistory()
    const {setAuth} = useContext(Auth)
    const [msg,setMsg]= useState('')

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
                .then(res=>{
                    if(res.status === 204){
                        setMsg("You haven't ordered anything yet")
                    }
                    else{
                        setOrders(res.data.reverse())
                    }
                })
                .catch(err=>sweet.fire('Error!', 'You need to login again', 'error',)
                    .then(ok=>{
                        Cookies.remove('token')
                        setAuth(false)
                        history.push('/login')
                    })
                )
        }
        setTimeout(getOrders, 500)}
    }
    useEffect(settingPage,[])
    
    if(orders.length === 0 && msg.length===0){
        return  <LoadingModal/>
    }
    else{
        return (
            <div className="page">
                <h1 className="page__title">Dashboard</h1>
                {msg?<p className="page__msg">{msg}</p>:
                <div>{orders.map((order)=>
                <Link to={{pathname: "/user/orderedItem", data: order}} className="order-detail" key={order._id}>
                    <div className="order-detail__id">{order._id}</div> 
                    <div className="order-detail__time">{moment.unix(order.timestamp).format('DD/MM/YYYY h:mm:ss')}</div>
                </Link>
                )}</div>}
            </div>
            
        )
    }
}

export {Dashboard as default}