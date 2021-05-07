import React,{useState, useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';
import sweet from 'sweetalert2';
import Modal from 'react-modal'
import {BiCalendar} from 'react-icons/bi'
import { AiOutlineClose} from 'react-icons/ai'
import PhoneInput from 'react-phone-number-input/input'
import LoadingModal from './LoadingModal'

const AddEmployee =({setModalState})=>{
    const [address, setAddress]= useState('')
    const [mobile, setMobile]= useState('')
    const [dob, setDob]= useState(new Date())
    const [email, setEmail]= useState('')
    const [msg, setMsg]= useState('')
    const [password, setPassword]= useState('')
    const [confirmPassword, setConfirmPassword]= useState('')
    const [username, setUsername]= useState('')
    const [signingIn, setSigningIn] = useState(false)
    const [openModal, setOpenModal] = useState(true)

    useEffect(()=>{
            if(!confirmPassword){
                setMsg('')
            }
            else if(confirmPassword!==password){
                setMsg(`Passwords did not match `)
            }else{
                setMsg('Passwords matched ')
            }
    },[password, confirmPassword])

    
    const toggleModal = () =>{
        setModalState(false)
        setOpenModal(false)
    }

    const onSubmit = async(e)=>{    
        setSigningIn(true)
        e.preventDefault()
            if(password !== confirmPassword){
                setSigningIn(false)
                sweet.fire({text: "Your Passwords don't match", icon: 'error'})
                .then(ok=>{
                    setPassword('')
                    setConfirmPassword('')
                })
            }
            else{
                const formData = new FormData()
                formData.append('username', username)
                formData.append('email', email)
                formData.append('address', address)
                formData.append('mobile', mobile)
                formData.append('dob', moment(moment.utc(dob)).format("X"))
                formData.append('password', password)
                formData.append('role', 'employee')
                formData.append('isVerified', true)

                await axios.post('/user/signup', formData)
                .then((res)=>{
                    setSigningIn(false)
                    sweet.fire({title: 'Account Created',icon:'success'})
                    .then(()=>{
                       toggleModal()
                    })
                })
                .catch(e=> {
                    setSigningIn(false)
                    sweet.fire({title:e.response.data.msg, icon: 'error'})
                    .then(()=>{
                        toggleModal()
                    })
                })
            }
        }
    
    if(signingIn){
        return <LoadingModal/>
    }
    else{
        return(
        <Modal
        isOpen={openModal}
        onRequestClose={toggleModal}
        className="form-modal"
        shouldReturnFocusAfterClose={false}>
            <button onClick={toggleModal} className="formClose-btn"><AiOutlineClose/></button>
            <form onSubmit={onSubmit} className="form" >
                   <input type='text' placeholder="Name" name="name" className="form__input" required={true}  onChange={(e)=>setUsername(e.target.value)}/>
                    <input type='email' placeholder="Email Address" name="email" className="form__input" required={true}  onChange={(e)=>setEmail(e.target.value)}/>
                    <div className="form__element">
                        <label className="form__label">Date of Birth < BiCalendar/></label>
                        <input type='date' name="bday" className="form__input" required={true}   onChange={(e)=>setDob(e.target.value)}/>
                    </div>
                    <textarea  name="address" placeholder="Address" required={true} className="form__input form__input--textarea" onChange={(e)=>setAddress(e.target.value)}></textarea>
                    <PhoneInput className="form__input" country="IN" placeholder="Mobile Number" value={mobile} onChange={setMobile}/>
                    <input type='password' placeholder="Password" value={password}  className="form__input" required={true} minLength={7} maxLength={16} onChange={(e)=>setPassword(e.target.value)}/>
                    <input type='password' placeholder="Confirm Password" value={confirmPassword} required={true} minLength={7} maxLength={16}  className="form__input" onChange={(e)=>setConfirmPassword(e.target.value)}/>
                <p className="form__msg">{msg}</p>
                <button className="button__auth">Submit</button>
            </form>
            
        </Modal>
    )}
}

export {AddEmployee as default}