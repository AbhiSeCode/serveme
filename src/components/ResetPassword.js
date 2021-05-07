import React, { useState, useEffect } from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios';
import sweet from 'sweetalert2';
import {RiLockPasswordLine} from 'react-icons/ri'

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
            }).then(data=> sweet.fire({title: 'Password Updated', icon: 'success'}).then(ok=>history.push('/')))
            .catch(err=>sweet.fire({title: 'Link Expired', icon: 'info'}).then(ok=>history.push('/')))
        }
    }
    return (
        <div className="page-content">
            <form className="form reset" onSubmit={submit}>
                <input type='password' placeholder="New Password" value={password}  className="form__input" required={true} minLength={7} maxLength={16} onChange={(e)=>setPassword(e.target.value)}/>
                <input type='password' placeholder="Confirm Password" value={confirmPassword} required={true} minLength={7} maxLength={16}  className="form__input" onChange={(e)=>setConfirmPassword(e.target.value)}/>
                <p className="form__msg">{msg}</p>
                <button className="button__auth">Save</button>
            </form>
        </div>
    )
}


export{ ResetPassword as default}