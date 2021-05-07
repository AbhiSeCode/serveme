import React, { useState } from 'react';
import axios from 'axios';
import sweet from 'sweetalert2';
const ForgotPassword = ()=>{

    const [email, setEmail] = useState('')

    const onSubmit = (e)=>{
        e.preventDefault()
        axios.post('/user/forgetpassword',{email})
        .then(data=>{
            sweet.fire("Email Send", "Please Check your indbox", "success")})
        .catch(err=>sweet.fire({title: err.response.data, icon: 'error'}))
    } 
    return (
        <div className="page-content">
            <form className="form reset" onSubmit={onSubmit}>
                    <input type='email' placeholder="Email Address" name="email" className="form__input" onChange={(e)=>setEmail(e.target.value)} required={true}/>
                    <button className="button__auth">Reset</button>
            </form>

        </div>
    )
}

export {ForgotPassword as default}