import React,{useState} from 'react';
import axios from 'axios'


const AddingItem = ()=>{
    const [name, setName]= useState('')
    const [price, setPrice]= useState('')
    const [time, setTime]= useState('')
    const [category, setCategory]= useState('breakfast')

    const enter = (e) =>{
        e.preventDefault()
       console.log(e)
        try{
            axios.post('http://localhost:8080/item/add', { name, price, time, category})
            .then(res=> console.log(res.statusText))
            .catch(e=> console.log(e))        
        }catch(e){
            console.log(e)
        }
    }
    return(
        <div>
            <form onSubmit={enter} className="form">
                <div className="form__element">
                    <label className="form__label"> Dish Name:</label>
                    <input type="text" placeholder="Item Name" className="form__input" onChange={(e)=>setName(e.target.value)} required={true}/>
                </div>
                <div className="form__element">
                    <label className="form__label"> Dish Price:</label>
                    <input type="number" className="form__input" placeholder="Item Price" onChange={(e)=>setPrice(e.target.value)} required={true}/>
                </div>
                <div className="form__element">  
                    <label className="form__label"> Dish Preparation Time: (Minutes)</label>
                    <input type="number" className="form__input" placeholder="Time to prepare item" onChange={(e)=>setTime(e.target.value)} required={true}/>
                </div>
                <div className="form__element">
                    <label className="form__label">Category of Dish:</label>
                    <select className="form__input" onChange={e=>setCategory(e.target.value)}>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                    </select>
                </div>
                <div className="button">
                    <button className="button__element">Add</button>
                </div>
            </form>
        </div>
    )
}

export {AddingItem as default}