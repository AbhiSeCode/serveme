import React,{useState} from 'react'
import {BiMessageAltDetail} from 'react-icons/bi'
import axios from 'axios'
import {FaMobileAlt} from 'react-icons/fa'
import {AiOutlineMail} from 'react-icons/ai'
import Swal from 'sweetalert2'

export const ContactUs = () =>{
    const [email, setEmail]= useState('')
    const [mobile, setMobile]= useState('')
    const [query, setQuery]= useState('')

    const contactUs = (e) => {
        e.preventDefault()
        axios.post('/user/contactus', {email, mobile, query})
        .then(()=>Swal.fire({
            icon: 'success',
            title: 'Thank you for contacting us.',
            showConfirmButton: false,
            timer: 1500
        }).then(()=> {
            setEmail('')
            setMobile('')
            setQuery('')
        }))
        .catch((err)=> Swal.fire({
            icon: 'error',
            titl: 'Something went wrong.',
            showConfirmButton: false,
            timer: 1500
        }))
    }
    
    return(
        <div className="contact-page">
            <div className="contact-element">
                <img src="/img/ServeMe.png" alt="Serve me logo"/>
                <label className="form__label"><FaMobileAlt/><a className="form__link" href="tel:+918534033595">+91 8534 033 595</a></label>
                <label className="form__label"><AiOutlineMail/><a className="form__link" href="mailto:abhishekdwivedi037@gmail.com">abhishekdwivedi037@gmail.com</a></label>
                <iframe title="location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1136.4100620644053!2d77.22993704875375!3d28.534677851310676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce22871f32d49%3A0x92e4978b0135ed7a!2zMjjCsDMyJzA0LjUiTiA3N8KwMTMnNDYuNyJF!5e0!3m2!1sen!2sin!4v1619342901984!5m2!1sen!2sin" width="90%" height="50%"   loading="lazy"></iframe>
            </div>
            <div className="contact-element">
            <form className="form" onSubmit={contactUs}>
                <div className="form__element">
                    <label className="form__label">Email <AiOutlineMail/></label>
                    <input type='email' placeholder="abc@xyz.in" value={email} name="email" className="form__input" required={true}  onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="form__element">
                    <label className="form__label">Contact Number <FaMobileAlt/></label>
                    <input type='tel' placeholder="99XXXXXX10" name="contact" value={mobile} minLength="10" required={true}  className="form__input" onChange={(e)=>setMobile(e.target.value)}/>
                </div>
                 <div className="form__element">
                    <label className="form__label">Message <BiMessageAltDetail/></label>
                    <textarea  name="msg" placeholder="Your query." required={true} className="form__input form__input--textarea" value={query} onChange={(e)=>setQuery(e.target.value)}></textarea>
                </div>
                <button className="button__auth">Submit</button>
            </form>
            </div>
        </div>
    )
}

export {ContactUs as default}