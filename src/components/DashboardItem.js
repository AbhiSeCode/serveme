import React, {useEffect, useState} from 'react';
import axios from 'axios'
import LoadingModal from './LoadingModal'
import { useHistory } from 'react-router-dom';

const DashboardItem = (orderNo)=>{
    const history = useHistory()
    const [data, setData]= useState([])
    let total= 0

    const settingPage= ()=>{
        if(!orderNo.location.data){
            history.push('/user/dashboard')
        }
        else{
            axios.post(`${process.env.baseUrl}/item/ordereditems`, {items : orderNo.location.data.order})
            .then(res=> setData(res.data))
        }
    }
    useEffect(settingPage,[])

    if(data.length === 0){
        return <LoadingModal/>
    }
    else{
        return (            
            <div className="page">
                <h1 className="page__title">Ordered Item</h1>
                <div className="order-header">
                    <div> Item Name</div>
                    <div> Item Price</div>
                    <div> Item Quantity</div>
                    <div> Item Total Price</div>
                </div>
                    {data.map((item)=>{
                        total += item.totalPrice
                        return(
                        <div className="order-item" key={item.name}>
                            <div className="order-item__content">{item.name}</div> 
                            <div className="order-item__content">{item.price}</div>
                            <div className="order-item__content">{item.quantity} </div>
                            <div className="order-item__content">{item.totalPrice}</div>
                        </div>
                        )}
                    )} 
             
                    <div className="order-item">
                        <div>Total Amount = {total}₹ + 18%GST</div>
                        <div> = </div>
                        <div>{total = total + total * 18/100}₹</div>
                    </div>
            </div>
        )
    }
}

export {DashboardItem as default}