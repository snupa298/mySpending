import { Button, Form, Input, message } from 'antd'
import React, { useState } from 'react'
import DefaultComponent from '../components/DefaultComponent'
import "../resources/maxbudget.css"
import axios from 'axios'


const MaxBudget = () => {

    const[loading,setLoading]=useState(false)
   // const[maxBudget,setMaxBudget]=useState("")

    const onFinish=async (values)=>{
        try{
     const user =JSON.parse(localStorage.getItem("SnupaSpending"))
     const todayDate=new Date();
     setLoading(true)
  await axios.post("/api/max/maxbudget",{...values,
     userId:user._id,
     date:todayDate
     })
//setMaxBudget(res.data)
     message.success("Budget added successfully")
         }catch(error){
          
             message.error("Something went wrong")
    
             setLoading(false)
         }
     }

  

  return (

<DefaultComponent>
<h1 className='my-3'>Budget for this month</h1>

<div className='budget my-5'>
    <div className='maxbudget'>
    <Form onFinish={onFinish}>
  <Form.Item name="budget" label="Budget">
    <Input size='large'/>
  </Form.Item>

  <Form.Item>
    <Button type="primary" htmlType="submit">
      Set
    </Button>
   
  </Form.Item>
  </Form>
    </div>

</div>

</DefaultComponent>
  )
}

export default MaxBudget
