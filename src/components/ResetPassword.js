import React, { useState, useEffect } from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios';
import sweet from 'sweetalert2';

const ResetPassword =() =>{
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [msg, setMsg]= useState('')
    const {token} = useParams()
    const history = useHistory()
    

    useEffect(()=>{
        if(!confirmPassword){
            setMsg('')
        }
        else if(confirmPassword!==password){
            setMsg('Passwords did not match ❌')
        }else{
            setMsg('Password Matched ✔')
        }
    },[password, confirmPassword])

    const submit = (e) =>{
        e.preventDefault()
        if(password !== confirmPassword){
            sweet.fire({text: "Your Passwords don't match", icon: 'error'})
            .then(ok=>{
                setPassword('')
                setConfirmPassword('')}
            )
        }
        else{
            axios.patch('/user/me', {password}, {
                headers: {'Authorization' : `Bearer ${token}`}
            }).then(data=> sweet.fire({title: 'Password Updated', icon: 'success'}).then(ok=>history.push('/login')))
            .catch(err=>sweet.fire({title: 'Link Expired', icon: 'info'}).then(ok=>history.push('/')))
        }
    }
    return (
        <div className="page">
            <h1 className="page__title">New Password</h1>
            <form className="form" onSubmit={submit}>
            <div className="form__element">
                    <label className="form__label">Password*:</label>
                    <input type='password' placeholder="********" value={password}  className="form__input" required={true} minLength={7} maxLength={16} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div className="form__element">
                    <label className="form__label">Confirm Password*:</label>
                    <input type='password' placeholder="********" value={confirmPassword} required={true} minLength={7} maxLength={16}  className="form__input" onChange={(e)=>setConfirmPassword(e.target.value)}/>
                </div>
                <p className="form__msg">{msg}</p>
                <div className="button">
                    <button className="button__element">Save</button>
                </div>
            </form>
        </div>
    )
}


export{ ResetPassword as default}