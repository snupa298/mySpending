import { Form, Input,message } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../resources/authentication.css"
import axios from 'axios'
import Spinner from '../components/Spinner'

function Login() {

    const navigate = useNavigate()
    const[loading,setLoading] = useState(false)

    const onFinish=async (values)=>{
        try{
            setLoading(true)
            const response = await axios.post("/api/users/login",values)
            localStorage.setItem("SnupaSpending",JSON.stringify({...response.data,password:""}))
            setLoading(false)
            message.success("Login successfully")
            navigate("/")
        }
    catch(error){
        setLoading(false)
    message.error("Something went wrong")
    }
    }

    useEffect(()=>{
if(localStorage.getItem("SnupaSpending")){
    navigate("/")
}
    },[])

  return (
    <div className='register'>
        {loading && <Spinner/>}
      <div className='row justify-content-center align-items-center w-100 h-100'>
      
        <div className='col-md-5'>
            <Form layout='vertical' onFinish={onFinish}>
                <h1>LOGIN</h1>
                <hr/>
  
                <Form.Item label='Email' name='email'>
<Input/>
                </Form.Item>
                <Form.Item label='Password' name='password'>
<Input type='password'/>
                </Form.Item>
                <div className='d-flex justify-content-between align-items-center'>
                    <Link to="/register">Not Registered yet,Click here to register</Link>
                    <button className='primary' type='submit'>LOGIN</button>
                </div>
            </Form>
            </div>
            <div className='col-md-5'>
       <div className='lottie'>
       <lottie-player src="https://assets1.lottiefiles.com/packages/lf20_06a6pf9i.json"
         background="transparent"  speed="1"  loop  autoplay></lottie-player>
       </div>
        </div>
      </div>
    </div>

  )
}

export default Login
