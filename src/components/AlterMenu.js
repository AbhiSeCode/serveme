import React,{useState, useEffect} from 'react';
import axios from 'axios'
import Modal from 'react-modal'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2';
import {logout} from '../actions/authUser'
import {useDispatch} from 'react-redux'


const AlterMenu = ({item = undefined, modalState})=>{
    const [displayImg, setDisplayImg] = useState('')
    const [img, setImg] = useState('')
    const [name, setName]= useState('')
    const [price, setPrice]= useState('')
    const [checkedFlag, setCheckedFlag]= useState(false)
    const [preTime, setPreTime]= useState('')
    const [detail, setDetail]= useState('')
    const [category, setCategory] = useState('veg')
    const dispatch = useDispatch()

     const deleteItem= (_id)=>{
        Swal.fire({
            title: 'Delete Item ?',
            showCancelButton: true,
            confirmButtonText: `Yes`,
            cancelButtonText: `Cancel`,
        }).then((result)=> {
            if(result.isConfirmed){
                axios.delete('/menu/item', {
                    headers:{
                         'Authorization' : `Bearer ${Cookies.get('token')}`
                    },
                    data: {_id}
                })
                .then(()=> {
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted',
                        showConfirmButton: false,
                        timer: 1500   
                    })
                    toggleState()
                })
                .catch(err=>{
                    if(err.response.data.status){
                        if(err.response.data.status === 401) {
                            Swal.fire({
                                icon: 'error',
                                title: err.response.data.msg
                            })
                            .then(dispatch(logout()))
                        }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: err.response.data.msg
                        })}
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Something went wrong!'
                        })   
                    }
                })
            }
        })
    }

    useEffect(()=>{
        if(item){
            setDisplayImg(`/img/menu/${item.img}`)
            setName(item.name)
            setPrice(item.price)
            setDetail(item.detail)
            setCategory(item.category)
            setPreTime(item.preTime)
        }  
    },[])

    useEffect(()=>{
        if(img){
            setDisplayImg(URL.createObjectURL(img))
        }
    },[img])

    const toggleState =()=>{
        modalState(false)
    }

    const changeCategory= (value)=>{
            setCategory(value)
            setCheckedFlag(!checkedFlag)
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        const formData= new FormData()
        formData.append('name', name)
        formData.append('price', price)
        formData.append('preTime', preTime)
        formData.append('detail',detail)
        img && formData.append('img',img)
        formData.append('category', category)
        if(item){
            formData.append('_id', item._id)
            axios.patch('/menu/edititem', formData, {
                headers:{
                    'Authorization' : `Bearer ${Cookies.get('token')}`
                }
            })
            .then(res=> {
                Swal.fire({
                    icon: 'success',
                    title: "Item Updated",
                    showConfirmButton: false,
                    timer: 1500
                }).then(toggleState())
            })
            .catch(err=> {
                if(err.response.data.status){
                    Swal.fire({
                        icon: 'error',
                        title: "Error",
                        text: err.response.data.msg,
                    }).then(toggleState())
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: "Error",
                        text: 'Something went wrong',
                    }).then(toggleState())
                }
            })        
        }else{
            axios.post('/menu/additem', formData,  {
                headers:{
                    'Authorization' : `Bearer ${Cookies.get('token')}`
                }
            })
            .then(res=> {
                Swal.fire({
                    icon: 'success',
                    title: "Item Added",
                    showConfirmButton: false,
                    timer: 1500
                }).then(toggleState())
            })
            .catch(err=> {
                if(err.response.data.status){
                    if(err.response.data.status === 401) {
                        Swal.fire({
                            icon: 'error',
                            title: err.response.data.msg
                        })
                        .then(dispatch(logout()))
                    }else{
                        Swal.fire({
                        icon: 'error',
                        title: "Error",
                        text: err.response.data.msg,
                        })
                        .then(toggleState())
                    }
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: "Error",
                        text: 'Something went wrong',
                    }).then(toggleState())
                }
            })        
        }
    }
    return(
        <Modal
        isOpen={true}
        onRequestClose ={toggleState}
        className="form-modal">
            {item && <button onClick={() => deleteItem(item._id)} className="page-btn">
             Delete Item
             </button>}
            <form onSubmit={handleSubmit} className="form">
               {displayImg &&  <div className="menu_item-image">
                    <img src={displayImg} alt="Food" />
                </div> }
                <div className="form__element">
                    <input type="file"   accept="image/png, image/jpeg" filename="img" className="form__input"  onChange={(e)=>setImg(e.target.files[0])} required={!item}/>
                </div>
                    <label className="form__label"> Item Name</label>
                    <input type="text" placeholder="Item Name" className="form__input" value={name} onChange={(e)=>setName(e.target.value)} required={!item} />
                    <label className="form__label"> Item Price</label>
                    <input type="text" className="form__input" placeholder="Item Price"value={price} onChange={(e)=>setPrice(e.target.value)} required={!item} />
                    <label className="form__label"> Item Category</label>
                <div className="form__radio" >  
                    <span>
                        <input type="radio" name="category" id="veg"  value="veg" onChange={(e)=>changeCategory(e.target.value)} checked={!checkedFlag}/>
                        <label htmlFor="veg">Veg</label>
                    </span>
                    <span>
                        <input type="radio" id="non-veg" name="category"  value="non-veg" onChange={(e)=>changeCategory(e.target.value)} checked={checkedFlag}/>
                        <label htmlFor="non-veg">Non-Veg</label>
                    </span>
                </div>
                    <label className="form__label"> Item Prepration Time <br/> (in minutes)</label>
                    <input type="text" className="form__input" placeholder="Time to prepare item" value={preTime} onChange={(e)=>setPreTime(e.target.value)} required={!item}/>
                    <label className="form__label"> Item Detail</label>
                    <textarea  name="msg" placeholder="Item Detail (Optional)" className="form__input form__input--textarea" value={detail} onChange={(e)=>setDetail(e.target.value)}></textarea>
                    <button className="button__auth">Submit</button>
            </form>
        </Modal>
    )
}

export {AlterMenu as default}