import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import Cookies from 'js-cookie';
import LoadingModal from './LoadingModal';
import sweet from 'sweetalert2';

const Menu = ()=>{
    const [category, setCategory]= useState('breakfast')
    const [items, setItems]= useState([])
    const [order, setOrder]= useState([])
    const history= useHistory()

    let quan='1'


    const getMenu=()=>{
        axios.get(`/order/menu/${category}`)        
        .then(res=>setItems(res.data))
    }

    const placeOrder=()=>{
        if(order.length===0){
            return sweet.fire({title: 'Empty!!', text:'Select atleast one item', icon: 'info'})
        }
        else if(Cookies.get('token')){
           history.push({pathname:'/user/confirmOrder', state:order})
        }
        else{
            Cookies.set('order', order)
            sweet.fire({title: 'One More Step' ,text:'Please Login/Signup to proceed.',icon: 'info'})
            .then(button=>history.push('/login'))     
        }
    }

    const preparingOrder=(bool,{id, quan})=>{
        if(bool === true){
            setOrder(order.concat({id, quantity: quan}))
        }
        else{
            setOrder(order.filter((item)=> item.id !== id))
        }
    }
    
    useEffect(getMenu ,[category])

    if(items.length===0){
        return (
            <LoadingModal/>
        )
    }
    else{
    return(
        <div>
            <h1 className="page__title">MENU</h1>
            <div className="menu">
                    <select className="menu__select" onChange={(e)=>setCategory(e.target.value)}>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                    </select>
                    {items.map((item)=>(
                        <div key={item._id} className="menu__item">
                            <div className="menu__item-element">
                                <label className="menu__item-label">{item.name}</label>
                                <label className="menu__item-label">{item.price}₹</label>
                            </div>
                            <div className="menu__item-element">
                                <div className="menu__item-input">
                                    <input className="menu__item-input menu__item-input--number"  type="number" defaultValue="1"  min="1" max="9" onChange={e=>quan=e.target.value} />
                                </div>
                                <div className="menu__item-input">
                                    {order.find(index =>index.id === item._id)
                                    ?  <input className="menu__item-input menu__item-input--checkbox" checked={true} type="checkbox" onChange={(e)=>preparingOrder(e.target.checked, {id: item._id, quan})}/>
                                    : <input className="menu__item-input menu__item-input--checkbox" checked={false}  type="checkbox" onChange={(e)=>preparingOrder(e.target.checked, {id: item._id, quan})}/>}
                                </div>
                            </div>
                        </div>
                    ))}
                <div className="button">
                    <button className="button__element" onClick={placeOrder}>Place Order</button>
                </div>
            </div>
        </div>    
    )
 }
}

export {Menu as default}