import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment'
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import sweet from 'sweetalert2';

const ConfirmOrder=(props)=>{
    const order= props.location.state
    const [items, setItems]= useState([])
    const history = useHistory()
    let total=0

    useEffect(()=>{ 
        axios.post('/item/ordereditems', {items: order})
        .then(res=> setItems(res.data))
        .catch((err)=>console.log(err.response.data))
    },[order])

    const confirmOrder= async() =>{
        const timestamp = moment.utc().format('X')
        axios.post('/order/confirmOrder',{order, timestamp},{
            headers:{
                'Authorization' : `Bearer ${Cookies.get('token')}`
            }   
        })
        .then((res)=>{
            sweet.fire({title:' Your Food is ordered', icon:"success"})
            .then(ok=>history.push('/user/dashboard'))
        })
        .catch(err=>sweet.fire({title: err.response.data, icon: 'error'}))    
    }
    return(
        <div>
            <h1 className="page__title">Confirm Order</h1>
            <div className="order-header">
                    <div className="order-header__content"> Item Name</div>
                    <div className="order-header__content"> Item Price</div>
                    <div className="order-header__content"> Item Quantity</div>
                    <div className="order-header__content"> Item Total Price</div>
                </div>
                
            {items.map((item)=>{
                total= total+ item.totalPrice
                return(
                    <div className="order-item" key={item.name}>
                        <div className="order-item__content">{item.name}</div>
                        <div className="order-item__content">{item.price}</div>
                        <div className="order-item__content">{item.quantity}</div>
                        <div className="order-item__content">{item.totalPrice}</div>
                    </div>)
                })}
            <div className="order-item">
                        <div>Total Amount = {total}₹ + 18%GST</div>
                        <div> = </div>
                        <div>{total = total + total * 18/100}₹</div>
            </div>

            <div className="button">
                <button className="button__element" onClick={confirmOrder}>Confirm Order</button>
            </div>
        </div>
    )
}

export {ConfirmOrder as default}