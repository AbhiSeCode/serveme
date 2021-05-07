import React, {useState} from 'react'
import {Link, NavLink} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {useHistory} from 'react-router' 
import axios from 'axios'
import Cookie from 'js-cookie'
import AuthForm from './AuthForm'
import LoadingModal from './LoadingModal'
import {logout} from '../actions/authUser'
import Profile from './Profile'



export const Header = () => {  
    const dispatch = useDispatch()
    const {role} = useSelector(state=> state.auth)
    const history = useHistory()
    const [signingOut, setSigningOut] = useState(false)
    const [modalState, setModalState]= useState(false)
    const [profileModal, setProfileModal] = useState(false)
    const [toggleNavBar, setToggleNavBar] = useState(false)

    const loggingOut = ()=>{
        setSigningOut(true)
        setToggleNavBar(false)
        axios.delete('/user/logout', {headers: {
            'Authorization' : `Bearer ${Cookie.get('token')}`
        }})
        .then((para)=>{
                dispatch(logout())
                history.push('/')
            setSigningOut(false)             
        }).catch(()=>{
            dispatch(logout())
            history.push('/')
            setSigningOut(false)
        })
    }
    if(signingOut){
        return <LoadingModal/>
    }

    else{
        return (
        <header>
                {modalState && <AuthForm setModalState={setModalState}/>}
                {profileModal && <Profile setModalState={setProfileModal}/>}
                <Link to="/" onClick={()=>setToggleNavBar(false)}>
                    <img className="header__image" src="/img/ServeMe.png"  alt="Serve Me Logo"/>
                </Link>
                <div id="nav-icon" className={toggleNavBar ? 'open': ''} onClick={()=>setToggleNavBar(!toggleNavBar)}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                    <nav className={toggleNavBar ? 'mobiMenu open': 'mobiMenu'}>
                            {!role &&<NavLink to="/" activeClassName="header__active" onClick={()=>setToggleNavBar(false)} className="header__link" exact={true}>Home</NavLink>}
                            {!role && <NavLink to="/menu" activeClassName="header__active" onClick={()=>setToggleNavBar(false)} className="header__link">Menu</NavLink>}
                            {role === 'user' &&<NavLink to="/user/menu" activeClassName="header__active" onClick={()=>setToggleNavBar(false)} className="header__link">Menu</NavLink>}
                            {role === 'employee' &&<NavLink to="/employee/menu" activeClassName="header__active" onClick={()=>setToggleNavBar(false)} className="header__link">Menu</NavLink>}
                            {role &&<NavLink to="/orders" activeClassName="header__active" onClick={()=>setToggleNavBar(false)}  className="header__link" exact={true}>Orders</NavLink>}
                            {role === 'admin' &&<NavLink to="/employees" activeClassName="header__active" onClick={()=>setToggleNavBar(false)} className="header__link" exact={true}>Employees</NavLink>}
                            {role === 'user' &&<Link to="#"  onClick={()=>{
                                setToggleNavBar(false) 
                                setProfileModal(true)}} className="header__link">Profile</Link>}
                            {!role &&<NavLink to="/contactus" activeClassName="header__active" onClick={()=>setToggleNavBar(false)} className="header__link">Contact Us</NavLink>}
                            {!role &&<Link to="#"  onClick={()=>{
                                setToggleNavBar(false) 
                                setModalState(true)}} className="header__link">Login</Link>}
                            {role && <Link to="#" className="header__link" onClick={()=>loggingOut()}>Logout</Link>}
                    </nav>
            </header>
    )}
}
