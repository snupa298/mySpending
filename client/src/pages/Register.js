import { Form, Input, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../resources/authentication.css"
import axios from "axios"
import Spinner from '../components/Spinner'

function Register() {

    const navigate=useNavigate();
    const[loading,setLoading] = useState(false)
const onFinish=async (values)=>{
    try{
        setLoading(true)
        await axios.post("/api/users/register",values)
        message.success("Registered successfully")
        setLoading(false)
    }
catch(error){
message.error("Something went wrong")
setLoading(false)
}
}
// useEffect(()=>{
//     if(localStorage.getItem("SheyUser")){
//         navigate("/")
//     }
//         },[])

  return (
    <div className='register'>
        {loading && <Spinner/>}
      <div className='row justify-content-center align-items-center w-100 h-100'>
        <div className='col-md-5'>
       <div className='lottie'>
       <lottie-player src="https://assets1.lottiefiles.com/packages/lf20_06a6pf9i.json"
         background="transparent"  speed="1"  loop  autoplay></lottie-player>
       </div>
        </div>
        <div className='col-md-5'>
            <Form layout='vertical' onFinish={onFinish}>
                <h1>REGISTER</h1>
                <hr/>
                <Form.Item label='Name' name='name'>
<Input/>
                </Form.Item>
                <Form.Item label='Email' name='email'>
<Input/>
                </Form.Item>
                <Form.Item label='Password' name='password'>
                <Input type='password'/>
                </Form.Item>
                <div className='d-flex justify-content-between align-items-center'>
                    <Link to="/login">Already Registered,Click here to login</Link>
                    <button className='primary' type='submit'>REGISTER</button>
                </div>
            </Form>
            </div>
      </div>
    </div>
  )
}

export default Register
