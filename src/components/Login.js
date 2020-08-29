import React, {useState, useContext} from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';
import Cookies from 'js-cookie';
import Auth from '../context/auth';
import sweet from 'sweetalert2';



const Login = ()=>{
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const {setAuth} = useContext(Auth)

    const onSubmit= async (e)=>{
        e.preventDefault()
        const data= {email, password}
         await axios.post('/user/login', data)
         .then(res=>{
             Cookies.set('token', res.data, {expires : 7})
             setAuth(true)
            })
         .catch(e=> sweet.fire({text: e.response.data, icon : 'error'})
                .then(ok=>setPassword('')))
    }
    
    return(
        <div>
            <h1 className="page__title">Login</h1>
            <form onSubmit={onSubmit} className="form">
                <div className="form__element">
                    <label className="form__label">Email: </label>
                    <input type='email' placeholder="abc@xyz.com" name="email" className="form__input" onChange={(e)=>setEmail(e.target.value)} required={true}/>
                </div> 
                <div className="form__element">
                    <label className="form__label">Password:</label>
                    <input type="password" placeholder="*********" name="password" value={password} className="form__input" minLength={7} maxLength={16} onChange={(e)=>{setPassword(e.target.value)}} required={true}/>
                </div>
                <div className="button">
                    <button className="button__element">Login</button>
                </div>
            </form>
            <p className="form__link"><NavLink to="/forgetpassword">Forget Password??</NavLink></p>
            <p className="form__link">New Here ?? Click <NavLink to='/signup'>Here</NavLink> to register.</p>
        </div>
    )
}

export {Login as default}