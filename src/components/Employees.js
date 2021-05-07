import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import LoadingModal from './LoadingModal'
import moment from 'moment'
import AddEmployee from './AddEmployee'
import swal from 'sweetalert2'
import {AiOutlineDownCircle  , AiOutlineUserAdd, AiOutlineUserDelete} from 'react-icons/ai'
import {logout} from '../actions/authUser'
import {useDispatch} from 'react-redux'
import Swal from 'sweetalert2'

function Employees() {

    const [employees, setEmployees] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const dispatch = useDispatch()


    const deleteEmployee= (_id)=>{
        swal.fire({
            title: 'Delete Employee ?',
            showCancelButton: true,
            confirmButtonText: `Yes`,
            cancelButtonText: `Cancel`,
        }).then((result)=> {
            if(result.isConfirmed){
                axios.delete('/user/employee', {
                    headers:{
                         'Authorization' : `Bearer ${Cookies.get('token')}`
                    },
                    data: {_id}
                })
                .then(()=> {
                    getEmployees()
                    swal.fire({
                            icon: 'success',
                            title: 'Deleted',
                            showConfirmButton: false,
                            timer: 1500   
                        })
                    })
                .catch(err=>{
                    if(err.response.data.status){
                        swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: err.response.data.msg
                        })
                    }else{
                     swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Something went wrong!'
                        })   
                    }
                })
            }
        })
    }

    const viewEmployee= (id, flag)=>{
        if(flag){
            setEmployees(order=>order.map(item=>{
                if(item._id === id){
                    item.show = false
                    return item
                }
                return item
            }))
        }else{
            setEmployees(order=>order.map(item=>{
                if(item._id === id){
                    item.show = true
                    return item
                }
                return item
            }))
        }
    }
    const getEmployees = () =>{
        axios.get('/user/employees', {
            headers:{
                'Authorization' : `Bearer ${Cookies.get('token')}`
            }
        }).then((employee)=> {
            setEmployees(employee.data)})
        .catch(err=>{
            if(err.response.data.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: err.response.data.msg
                })
                .then(dispatch(logout()))
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Something went wrong'
                })
            }
        })
    }
    useEffect(getEmployees,[])

    useEffect(()=>{
        if(!openModal){
            getEmployees()
        }
    },[openModal])

    if(!employees){
      return  <LoadingModal/>
    }else if(employees.length === 0){
        return <>
            {openModal && <AddEmployee setModalState={setOpenModal}/>}
            <button onClick={()=>setOpenModal(true)} className="page-btn">Add Employee <AiOutlineUserAdd/></button>
            <p className="page__title page-msg" >You don't have any employee yet</p>
        </>
    }
    else{
        return (
            <>
            {openModal && <AddEmployee setModalState={setOpenModal}/>}
                    <button onClick={()=>setOpenModal(true)} className="page-btn">Add Employee <AiOutlineUserAdd/></button>
                   {employees.map(employee=>(
                        <div key={employee._id} className="box  center">
                            <div className="box-details header">
                                <label>Employee Name</label>
                                <label>Joined At</label>
                            </div>
                            <div className="box-details" >
                                <label>{employee.username}</label>
                                <label>{moment(employee.createdAt).format('DD-MM-YYYY')}</label>
                            </div>
                            <div className="box-items">
                                <button  onClick={(e)=>viewEmployee(employee._id, employee.show)} className={employee.show? "box-btn open": "box-btn"}><AiOutlineDownCircle/></button>
                                <div  className={employee.show? "box-info show" : "box-info "}>
                                    <div>
                                        <label>Mobile:</label>
                                        <label>{employee.mobile}</label>
                                    </div>
                                    <div>
                                        <label>DoB:</label>
                                        <label>{moment.unix(employee.dob).format('DD-MM-YYYY')}</label>
                                    </div>
                                    <div>
                                        <label>Email:</label>
                                        <label>{employee.email}</label>
                                    </div>
                                    <div>
                                        <label>Address:</label>
                                        <label>{employee.address}</label>
                                    </div>
                                    <button onClick={()=>deleteEmployee(employee._id)}>
                                        <AiOutlineUserDelete/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                    ))}
            </>
        )
    }
}

export default Employees
    