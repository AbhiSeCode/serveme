import React,{useState, useEffect, useContext} from 'react';
import axios from 'axios';
import moment from 'moment';
import Auth from '../context/auth';
import Cookies from 'js-cookie';
import sweet from 'sweetalert2';

const SignUp =()=>{
    const [address, setAddress]= useState('')
    const [mobile, setMobile]= useState('')
    const [dob, setDob]= useState(new Date())
    const [email, setEmail]= useState('')
    const [msg, setMsg]= useState('')
    const [password, setPassword]= useState('')
    const [confirmPassword, setConfirmPassword]= useState('')
    const [username, setUsername]= useState('')
    const {setAuth}= useContext(Auth)

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

    const onSubmit = async(e)=>{
        e.preventDefault()
       if(password !== confirmPassword){
            sweet.fire({text: "Your Passwords don't match", icon: 'error'})
            .then(ok=>{
                setPassword('')
                setConfirmPassword('')}
            )
        }
        else{
            const userData= {
                address,
                dob: moment(moment.utc(dob)).format("X"),
                email,
                mobile,
                password,
                username
            }
            console.log(typeof userData.mobile)
            await axios.post('/user/signup', userData)
            .then((res)=>{
                sweet.fire({title: 'Account Created',icon:'success'})
                .then(ok=>{
                    Cookies.set('token', res.data.token, {expires : 7})
                    setAuth(true)
                })
            })
            .catch(e=> sweet.fire({title:e.response.data, icon: 'error'}))
        }
    }
    
    return(
        <div>
            <h1 className="page__title">SignUp</h1>
            <form onSubmit={onSubmit} className="form" >
                <div className="form__element">
                    <label className="form__label">Name*:</label>
                    <input type='text' placeholder="Andrew" name="name" className="form__input" required={true}  onChange={(e)=>setUsername(e.target.value)}/>
                </div>
                <div className="form__element">
                    <label className="form__label">Email*:</label>
                    <input type='email' placeholder="abc@xyz.in" name="email" className="form__input" required={true}  onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="form__element">
                    <label className="form__label">Date-Of-Birth*:</label>
                    <input type='date' name="bday" className="form__input" required={true}  onChange={(e)=>setDob(e.target.value)}/>
                </div>
                <div className="form__element">
                    <label className="form__label">Address*:</label>
                    <textarea  name="address" placeholder="345C Moorti Nagar , New Delhi 101010" required={true} className="form__input form__input--textarea" onChange={(e)=>setAddress(e.target.value)}></textarea>
                </div>
                <div className="form__element">
                    <label className="form__label">Contact Number*:</label>
                    <input type='tel' placeholder="99XXXXXX10" name="contact" minLength="10" required={true}  className="form__input" onChange={(e)=>setMobile(e.target.value)}/>
                </div>
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
                    <button className="button__element">Submit</button>
                </div>
            </form>
        </div>
    )
}

export {SignUp as default}