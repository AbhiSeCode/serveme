import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import moment from 'moment'
import sweet from 'sweetalert2'
import Modal from 'react-modal'
import Loading from './LoadingModal'
import {AiOutlineClose} from 'react-icons/ai'
import {logout} from '../actions/authUser'
import {useDispatch} from 'react-redux'

const Profile= ({setModalState})=>{
    const [username, setUsername]= useState('')
    const [dp, setDp]= useState('')
    const [newDp, setNewDp]= useState('')
    const [address, setAddress]= useState('')
    const [mobile, setMobile]= useState('')
    const [dob, setDob]= useState(new Date())
    const [email, setEmail]= useState('')
    const [editFlag, setEditFlag]= useState(false)
    const [msg, setMsg]= useState('')
    const [oldPassword, setOldPassword]= useState('')
    const [newPassword, setNewPassword]= useState('')
    const [confirmPassword, setConfirmPassword]= useState('')
    const [openModal, setOpenModal] = useState(true)
    const [isLoading, setIsLoading]= useState(true)
    const dispatch = useDispatch()
    
    const header = {'Authorization' : `Bearer ${Cookies.get('token')}`}

    const errorHandling = (err) =>{
        setIsLoading(false)
        if(err.response.data.status)
            sweet.fire({title:'Error!', text: err.response.data.msg ,icon: 'error'})
            .then(()=>{
                if(err.response.data.status === 401) dispatch(logout())
                toggleModal()
            })
        else{
            sweet.fire({title:'Error!', text: 'Please try again' ,icon: 'error'})
            .then(()=>toggleModal())
        }
    }
       const toggleModal = () =>{
        setModalState(false)
        setOpenModal(false)
    }
    const settingPage=()=>{
        axios.get('/user/me', {headers:header})
        .then(res=>{
            setUsername(res.data.username)
            setMobile(res.data.mobile)
            setEmail(res.data.email)
            setDob(moment.unix(res.data.dob).format('YYYY-MM-DD'))
            setAddress(res.data.address)
            setDp(btoa(new Uint8Array(res.data.avatar.data).reduce(function (data, byte) {
                return data + String.fromCharCode(byte);
            }, '')))
            setIsLoading(false)
            // setDp(btoa(String.fromCharCode(...new Uint32Array(res.data.avatar.data))))
        })
        .catch(errorHandling)
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
        if(editFlag){
            const formData = new FormData()
            formData.append('username', username)
            formData.append('address', address)
            formData.append('mobile', mobile)
            formData.append('dob', moment(moment.utc(dob)).format("X"))
            if(newDp) {
                setDp('')
                formData.append('dp', newDp)
            }
            if(newPassword !== confirmPassword){
                alert("Your Passwords didn't match")
            }
            else if(!oldPassword){
                 setIsLoading(true)
                axios.patch('/user/me', formData, {headers: header})
                .then(res=>{
                    setIsLoading(false)
                    sweet.fire({title:'Profile Updated',icon: 'success', showConfirmButton: false, timer: 1500})
                })
                .catch(errorHandling)
            }
            else{
                 setIsLoading(true)
                formData.append('password', newPassword)
                formData.append('oldPassword', oldPassword)
                axios.patch('/user/me', formData, {headers: header})
                .then(res=>{
                    setIsLoading(false)
                    sweet.fire({title:'Profile Updated',icon: 'success'})
                })
                .catch(errorHandling)
            }
            setOldPassword('')
            setNewPassword('')
            setConfirmPassword('')
            setEditFlag(false)
        }else{
            setEditFlag(true)
        }
    }
    if(isLoading){
        return <Loading/>
    }else{
        return (
            <Modal
            isOpen={openModal}
            onRequestClose={toggleModal}
            className="form-modal"
            shouldReturnFocusAfterClose={false}>
                <button onClick={toggleModal} className="formClose-btn"><AiOutlineClose/></button>
                <form className="form">
                <div className="form-image">
                    {!newDp && <img className="profile-image" alt="Profile" src={`data:image/png;base64,${dp}`}/>}
                    {newDp && <img className="profile-image" alt="profile" src={URL.createObjectURL(newDp)}/>}
                </div>
                    {editFlag && <input type="file" name="dp" className="form-upload" required accept="image/png, image/jpeg" onChange={(e)=>setNewDp(e.target.files[0])}/>}
                    <input type='text'  name="name" placeholder="Name" value={username} readOnly={!editFlag} className="form__input" required={true} onChange={(e)=>setUsername(e.target.value)} />
                    <input type='text'  name="name"  placeholder="Email" value={email} readOnly className="form__input" required={true} />
                    <div className="form__element">
                        <label className="form__label">Date-Of-Birth:</label>
                        <input type='date' name="bday" value={dob} readOnly={!editFlag} className="form__input" required={true} onChange={(e)=>setDob(e.target.value)} />
                    </div>
                    <textarea  name="address" placeholder="Address" required={true} readOnly={!editFlag} value={address} className="form__input form__input--textarea" onChange={(e)=>setAddress(e.target.value)}></textarea>
                    <input type='text' name="contact" placeholder="Mobile Number" minLength="10" readOnly={!editFlag} required={true} value={mobile} onChange={(e)=>setMobile(e.target.value)} className="form__input"/>
                    <fieldset className={editFlag ? "form__fieldSet open" : "form__fieldSet"}>
                        <legend>Reset Your Password</legend>
                        <input type='password' placeholder="Current Password" value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} className="form__input"/>
                        <input type='password' placeholder="New Password" value={newPassword}  className="form__input" minLength={7} maxLength={16} onChange={(e)=>setNewPassword(e.target.value)}/>
                        <input type='password' placeholder="Confirm Password" value={confirmPassword} minLength={7} maxLength={16}  className="form__input" onChange={(e)=>setConfirmPassword(e.target.value)}/>
                        <p className="form__msg">{msg}</p>
                    </fieldset>
                    <div className="button">
                        <button className="button__auth" onClick={updateUser}>{editFlag ? 'Save': 'Edit'}</button>
                    </div>
                </form>
            </Modal>

        )
    }
}

export {Profile as default}