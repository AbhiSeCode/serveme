import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import LoadingModal from './LoadingModal';
import sweet from 'sweetalert2';
import Modal from 'react-modal'
import AuthForm from './AuthForm'
import cryptoRandomString from 'crypto-random-string'
import {useDispatch, useSelector} from 'react-redux'
import {getData, selectItem, deselectItem, searchItem, addQuantity, minusQuantity, clearState, finalOrder} from '../actions/menuActions'
import {AiOutlineMinus, AiOutlinePlus, AiOutlineClose, AiOutlineDelete} from 'react-icons/ai'
import {IoFastFoodOutline} from 'react-icons/io5'
import {BsCircleFill} from 'react-icons/bs'

Modal.setAppElement("#root");
const Menu = ()=>{
    const dispatch = useDispatch()
    const {data, items, order} = useSelector(state=> state.menu)
    const [loginModal, setLoginModal] = useState(false)
    const [modalState, setModalState]= useState(false)
    const [totalAmount, setTotalAmount]= useState(0)
    const [search, setSearch] = useState('')



    const toggleModalState = ()=>{
        if(order.length===0){
            return sweet.fire({title: 'Empty!!', text:'Select atleast one item', icon: 'info'})
        }
        else if(Cookies.get('token')){
           setModalState(!modalState)
        }
        else{
            sweet.fire({title: 'One More Step' ,text:'Please Login/Signup to proceed.',icon: 'info'})
            .then(()=>setLoginModal(true))     
        }
    }

    const calcTotal = ()=>{ 
        if(order.length === 0){
            setModalState(false)
        }else{
            let amount = 0
            order.map(item=>  amount +=  (item.price * item.quantity))
            setTotalAmount(amount)
        }
    }

    const getMenu=()=>{
        dispatch(clearState())
        axios.get(`/menu/`)        
        .then(res=>{
            dispatch(getData(res.data.sort((a,b)=>a.name > b.name ? 1 : -1)))
            })
        .catch((err)=>{
            sweet.fire({
                icon: 'error',
                title: 'Error',
                text: 'Something went wrong.'
            })
        })
    }

    const placeOrder=()=>{
            setModalState(false)
            dispatch(finalOrder())
            axios.post('/order/placeOrder', {order, orderNumber: cryptoRandomString({length: 10, type: 'base64'})},
            {
                headers:{
                    'Authorization' : `Bearer ${Cookies.get('token')}`
                }
            })
            .then(()=>{
                getMenu()
                sweet.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Order Placed.',
                showConfirmButton: false,
                timer: 1500
            })})     
            .catch((err)=>alert(err) )
    }


    const preparingOrder=(e,selectedItem)=>{
        if(e.target.textContent === 'Add'){
            dispatch(selectItem(selectedItem))
        }
        else{
            dispatch(deselectItem(selectedItem))
        }
    }

    useEffect(()=>{
        dispatch(searchItem(search))
    },[search])


    useEffect(getMenu ,[])
    useEffect(calcTotal,[order])


    if(data.length===0 && items.length === 0){
        return (
            <LoadingModal/>
        )
    }
    else{
        return(
            <div className="page-content">
                {loginModal && <AuthForm setModalState={setLoginModal}/>}
                <div className="menu-search">
                    <input type="text" 
                        placeholder="Search Me " 
                        value={search} 
                        onChange={(e)=>setSearch(e.target.value)} 
                        autoComplete="off"/>
                </div>
                <div className=" menu">
                        {items.map((item)=>(
                            <div key={item._id} className="menu__item">
                                    <div className={item.category=== "veg"? "menu_item-cat veg": "menu_item-cat" }>
                                        <BsCircleFill/>
                                    </div>
                                    <div className="menu_item-image">
                                        <img src={`/img/menu/${item.img}`} alt="Food" />
                                    </div> 
                                    <label className="menu__item-label">{item.name}</label>
                                    <label className="menu__item-label">{item.price}₹</label>
                                    <button className={item.selected ? "menu__item-btn remove": "menu__item-btn "}  onClick={(e)=>preparingOrder(e,item)}>{item.selected ?'Remove' :'Add'}</button>
                            </div>
                        ))}
                        {items.length === 0 ? 
                        <p className="page__title page-msg">We don't serve this. <IoFastFoodOutline/></p>: 
                        <div onClick={()=> toggleModalState()} className={order.length ? "cart-img" : "cart-img faded"}>
                            <img src="/img/serving-dish.png" alt="serving dish"/>
                            <div className="cart-number">
                                <label>{order.length}</label>
                            </div>
                        </div>}
                </div>
                        <Modal
                        isOpen= {modalState}   
                        onRequestClose={toggleModalState}
                        className="page-content menu-modal"
                        closeTimeoutMS={500}>
                            <button className="menuClose-btn" onClick={()=> setModalState(false)}><AiOutlineClose/></button>
                            <div className="bill-paper">
                                <div  className="paper-strip">
                                </div>
                                <div className="paper-strip">
                                </div>
                                <div className="paper-strip">
                                </div>
                                <div className="paper-strip">
                                </div>
                                <div className="paper-strip">
                                </div>
                                <div className="paper-strip">
                                </div>
                                <div className="paper-strip">
                                </div>
                                <div className="paper-strip">
                                </div>
                                <div className="paper-strip">
                                </div>
                                <div className="paper-strip">
                                </div>
                                <div className="paper-strip">
                                </div>
                                <div className="paper-strip">
                                </div>
                                <div className="paper-strip">
                                </div>
                            </div>
                            
                            <div className="menu-content">
                                <h2 className="modal-title">Your Order</h2>
                                {order.map((item)=>(
                                    <div key={item._id} className="menu__item">
                                            <label className="menu__item-label">{item.name}</label>
                                            <label className="menu__item-label price">{item.price}₹</label>
                                            <div className="menu__item-quantity">
                                                <button className="menuQuantity-btn"  onClick={()=> dispatch(minusQuantity(item))}><AiOutlineMinus/></button>
                                                <input type="text" readOnly value={item.quantity} />
                                                <button className="menuQuantity-btn" onClick={()=> dispatch(addQuantity(item))}><AiOutlinePlus/></button>
                                            </div>
                                            <label className="menu__item-label price">{item.price * item.quantity}₹</label>
                                            <button className="menu__item-btn remove" onClick={(e)=>preparingOrder(e,item)}><AiOutlineDelete/></button>
                                    </div>
                                ))}
                                <div className ="menu-modal-fixed">
                                    <p>Total = {totalAmount + (totalAmount * .18)}₹ <br/>
                                        <span>18% GST applied</span></p>
                                    <button onClick={placeOrder} className="placeOrder-btn">Place Order</button>
                                </div>
                            </div>                           
                        </Modal>
            </div>    
        )
    }
}



export {Menu as default}