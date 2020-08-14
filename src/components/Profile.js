import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import moment from 'moment'

const Profile= ()=>{
    const [username, setUsername]= useState('')
    const [address, setAddress]= useState('')
    const [mobile, setMobile]= useState('')
    const [dob, setDob]= useState(new Date())
    const [email, setEmail]= useState('')
    const [editFlag, setEditFlag]= useState(true)
    const [buttonText, setButtonText]= useState('Edit')
    const [msg, setMsg]= useState('')
    const [oldPassword, setOldPassword]= useState('')
    const [newPassword, setNewPassword]= useState('')
    const [confirmPassword, setConfirmPassword]= useState('')

    
    const header = {'Authorization' : `Bearer ${Cookies.get('token')}`}

    const settingPage=()=>{
        axios.get('/user/me', {headers:header})
        .then(res=>{
            setUsername(res.data.username)
            setMobile(res.data.mobile)
            setEmail(res.data.email)
            setDob(moment.unix(res.data.dob).format('YYYY-MM-DD'))
            setAddress(res.data.address)
        })
        .catch(console.log)
    }

    useEffect(settingPage, [])


    useEffect(()=>{
        if(!confirmPassword){
            setMsg('')
        }
        else if(confirmPassword!==newPassword){
            setMsg('Passwords did not match ❌')
        }else{
            setMsg('Password Matched ✔')
        }},[confirmPassword, newPassword])


    const updateUser = (e) =>{
        e.preventDefault()
        if(!editFlag){
                setButtonText('Edit')
                setEditFlag(true)
                if(newPassword !== confirmPassword){
                    alert("Your Passwords didn't match")
                    setOldPassword('')
                    setNewPassword('')
                    setConfirmPassword('')
                }
                else if(!oldPassword){
                    const data= {username, mobile, address, dob: moment.utc(dob).format('X')}
                    axios.patch('/user/me', data, {headers: header})
                    .then(res=>alert('Profile Updated'))
                    .catch(e=>alert(e.response.data))
                    setOldPassword('')
                    setNewPassword('')
                    setConfirmPassword('')
                }
                else{
                    const data= {username, mobile, address, dob: moment.utc(dob).format('X'), password: newPassword, oldPassword}
                    axios.patch('/user/me', data, {headers: header})
                    .then(res=>alert('Profile Updated'))
                    .catch(e=>alert(e.response.data))
                    setOldPassword('')
                    setNewPassword('')
                    setConfirmPassword('')
                }
        }
        else{
            setEditFlag(false)
            setButtonText('Save')
        }
    }

    return (
        <div>
                <h1 className="page__title">Profile Page</h1>
            <form className="form">
            <div className="form__element">
                    <label className="form__label">Name:</label>
                    <input type='text'  name="name" value={username} readOnly={editFlag} className="form__input" required={true} onChange={(e)=>setUsername(e.target.value)} />
                </div>
                <div className="form__element">
                    <label className="form__label">Email:</label>
                    <input type='email' name="email" value={email} disabled={true} className="form__input" required={true} onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className="form__element">
                    <label className="form__label">Date-Of-Birth:</label>
                    <input type='date' name="bday" value={dob} readOnly={editFlag} className="form__input" required={true} onChange={(e)=>setDob(e.target.value)} />
                </div>
                <div className="form__element">
                    <label className="form__label">Address:</label>
                    <textarea  name="address" required={true} readOnly={editFlag} value={address} className="form__input form__input--textarea" onChange={(e)=>setAddress(e.target.value)}></textarea>
                </div>
                <div className="form__element">
                    <label className="form__label">Contact Number:</label>
                    <input type='text' name="contact" minLength="10" readOnly={editFlag} required={true} value={mobile} onChange={(e)=>setMobile(e.target.value)} className="form__input"/>
                </div>
                {editFlag?<p></p>:
                    <fieldset>
                        <legend>Reset Your Password</legend>
                        <div className="form__element">
                            <label className="form__label">Old Password</label>
                            <input type='password' value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} className="form__input"/>
                        </div>
                        <div className="form__element">
                            <label className="form__label">New Password:</label>
                            <input type='password'  value={newPassword}  className="form__input" minLength={7} maxLength={16} onChange={(e)=>setNewPassword(e.target.value)}/>
                        </div>
                        <div className="form__element">
                            <label className="form__label">Confirm Password:</label>
                            <input type='password'  value={confirmPassword} minLength={7} maxLength={16}  className="form__input" onChange={(e)=>setConfirmPassword(e.target.value)}/>
                        </div>
                        <p className="form__msg">{msg}</p>
                    </fieldset>}
                <div className="button">
                    <button className="button__element" onClick={updateUser}>{buttonText}</button>
                </div>
            </form>
        </div>

    )
}

export {Profile as default}