import React, { useState } from 'react';
import axios from 'axios';
import sweet from 'sweetalert2';

const ForgetPassword = ()=>{

    const [email, setEmail] = useState('')

    const onSubmit = (e)=>{
        e.preventDefault()
        axios.post('/user/forgetpassword',{email})
        .then(data=>sweet.fire("Email Send", "Please Check your indbox", "success"))
        .catch(err=>sweet.fire({title: err.response.data, icon: 'error'}))
    } 
    return (
        <div>
            <h1 className="page__title">Reset Password</h1>
            <form className="form" onSubmit={onSubmit}>
                <div className="form__element">
                <label className="form__label">Email: </label>
                    <input type='email' placeholder="abc@xyz.com" name="email" className="form__input" onChange={(e)=>setEmail(e.target.value)} required={true}/>
                </div>
                <div className="button">
                    <button className="button__element">Reset</button>
                </div>
            </form>

        </div>
    )
}

export {ForgetPassword as default}