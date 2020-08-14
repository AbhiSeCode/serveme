import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment'
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

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
        console.log({order, timestamp})
        axios.post('/order/confirmOrder',{order, timestamp},{
            headers:{
                'Authorization' : `Bearer ${Cookies.get('token')}`
            }   
        })
        .then((res)=>{
            alert('Your Food is ordered. :)')
            console.log(res)
            history.push('/user/dashboard')
        })
        .catch(err=>console.log(err.response.data))    
    }
    return(
        <div className="page">
            <h1 className="page__title">Confirm Order</h1>
            <div className="order-header">
                    <div> Item Name</div>
                    <div> Item Price</div>
                    <div> Item Quantity</div>
                    <div> Item Total Price</div>
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