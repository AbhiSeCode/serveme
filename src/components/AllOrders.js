import React,{useEffect, useState} from 'react'
import axios from 'axios'
import Cookies, { set } from 'js-cookie'
import moment from 'moment'
import {AiOutlineDownCircle} from 'react-icons/ai'
import {useDispatch} from 'react-redux'
import {logout} from '../actions/authUser'
import LoadingModal from './LoadingModal'
import sweet from 'sweetalert2'
import {IoFastFoodOutline} from 'react-icons/io5'

const AllOrders = () => {
    const [orders, setOrders] = useState()

    const dispatch = useDispatch()
    const viewOrder= (id, flag)=>{
        if(flag){
            setOrders(order=>order.map(item=>{
                if(item._id === id){
                    item.show = false
                    return item
                }
                return item
            }))
        }else{
            setOrders(order=>order.map(item=>{
                if(item._id === id){
                    item.show = true
                    return item
                }
                return item
            }))
        }
    }


   
    const gettingOrders= () =>{
        axios.get('/order/', 
            { 
                headers:{
                    'Authorization' : `Bearer ${Cookies.get('token')}`
                }
            }
        ).then((res)=>{
            setOrders(res.data)
        }).catch((err)=>{
            if(err.response.data.status)
            sweet.fire({title:'Error!', text: err.response.data.msg ,icon: 'error'})
            .then(()=>{
                if(err.response.data.status === 401) dispatch(logout())
            })
            else{
                sweet.fire({title:'Error!', text: 'Please try again' ,icon: 'error'})
            }
        })
    }
    useEffect(gettingOrders, [])

    if(!orders){
        return <LoadingModal/>
    }
    else if(orders.length === 0){
        return <p className="page__title page-msg">Nothing Here.<IoFastFoodOutline/> </p>
        
    }else{
        return (
            <div className="page-content">
                {orders.map((order, index)=>(
                    <div key={order._id} className={index % 2 === 0 ? "box ": "box left"}>
                        <div className="box-details header">
                            <label>Order Number</label>
                            <label>Ordered At</label>
                        </div>
                        <div className="box-details" >
                            <label>{order.orderNumber}</label>
                            <label>{moment(order.createdAt).format('DD-MM-YYYY')} <br/>{moment(order.createdAt).format('h:mm A')}</label>
                        </div>
                        <div  className="box-items">
                            <button  onClick={(e)=>viewOrder(order._id, order.show)} className={order.show? "box-btn open": "box-btn"}><AiOutlineDownCircle/></button>
                            <h3 className={order.show? "box-item show" : "box-item "}>Order:</h3>
                            {order.items.map(item =>(
                                    <div key={item._id} className={order.show? "box-item show" : "box-item "}>
                                        <label>{item.name}</label>
                                        <label className="amount">{item.price}₹</label>
                                        <label className="quantity">{item.quantity}</label>
                                        <label className="amount">{item.price * item.quantity}₹</label>
                                    </div>
                                ))}
                                <div className={order.show? "box-item show" : "box-item "}>
                                        <label>Total Amount : </label>
                                        <label className="amount">{order.amount}₹</label>
                                </div>

                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default AllOrders
