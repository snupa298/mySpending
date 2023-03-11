import { Button,DatePicker,Form, Input, message, Select} from 'antd'
import React, { useEffect, useState } from 'react'
import DefaultComponent from '../components/DefaultComponent'
import "../resources/home.css"
import { Container,Row } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment'


function Home() {



     const[loading,setLoading]=useState(false)
     const [totalAmount,setTotalAmount]=useState("")
     const[remAmt,setRemAmt]=useState("")
     const[monthlyBudget,setMonthlyBudget]=useState("")
     const[lastMonthBudget,setLastMonthBudget]=useState("")
     const[lastMonthSaving,setLastMonthSaving] =useState("")
     const[totalSavings,setTotalSavings] =useState("")
     const[firstUsedDate,setFirstUsedDate]=useState("")

     var getRemainingDays = ()=>{
        var date = new Date()
        var time = new Date(date.getTime());
        time.setMonth(date.getMonth() + 1)
        time.setDate(0)
        var days = time.getDate() > date.getDate() ? time.getDate() - date.getDate() : 0;
        return days;
    }

    const totalAmt=async ()=>{
        try{
          const user = JSON.parse(localStorage.getItem("SnupaSpending"))
            setLoading(true)
           const response = await axios.post("/api/tr/transofmonth",
           {userId:user._id})
          setTotalAmount(response.data.totalAmount)
      
            setLoading(false)
        
        }
    catch(error){
  
    setLoading(false)
    message.error("Something went wrong")
    }

   }

   const balAmt=async ()=>{
    try{
      const user = JSON.parse(localStorage.getItem("SnupaSpending"))
        setLoading(true)
       const response = await axios.post("/api/tr/transofmonth",
       {userId:user._id})
       setMonthlyBudget(response.data.monthlyBudget)
       setRemAmt(response.data.monthlyBudget - response.data.totalAmount)
        setLoading(false)
    
    }
catch(error){

setLoading(false)
message.error("Something went wrong")
}
}

const lastmonthremAmt=async ()=>{
    try{
      const user = JSON.parse(localStorage.getItem("SnupaSpending"))
        setLoading(true)
       const response = await axios.post("/api/tr/transoflastmonth",
       {userId:user._id})
       //setLastMonthBudget(response.data.monthlyBudget)
       setLastMonthSaving(response.data.remAmount)
        setLoading(false)
    
    }
catch(error){

setLoading(false)
message.error("Something went wrong")
}
}





     const onFinish=async (values)=>{
       try{
    const user =JSON.parse(localStorage.getItem("SnupaSpending"))
    //const todayDate=new Date();
    setLoading(true)
    await axios.post("/api/tr/addtrans",{...values,
    userId:user._id
    // date:todayDate
    })
    const amt = totalAmount+parseInt( values.amount)
   setTotalAmount(amt)
   setRemAmt(monthlyBudget-amt)
   totalSaving(values.amount)
   firstUsedDate(values.firstUsedDate)
    message.success("Transaction added successfully")
        }catch(error){
         
            message.error("Something went wrong")
   
            setLoading(false)
        }
    }

    const totalSaving = async(newSpending)=>{
      try{
        console.log('totalSaving')
        const user = JSON.parse(localStorage.getItem("SnupaSpending"))
          setLoading(true)
         const response = await axios.post("/api/tr/updatetotalsavings",
        {userId:user._id, newSpending: newSpending})
        console.log(response)
       
         setTotalSavings(response.data.savings)
          setLoading(false)
      
      }
  catch(error){
  
  setLoading(false)
  message.error("Something went wrong")
  }
    }

    const getTotalSaving = async()=>{
      try{
     
        const user = JSON.parse(localStorage.getItem("SnupaSpending"))
          setLoading(true)
         const response = await axios.post("/api/tr/gettotalsavings",
        {userId:user._id})
      
       console.log(response)
         setTotalSavings(response.data.totalSavings.savings)
         setFirstUsedDate(response.data.totalSavings.firstUsedDate)
          setLoading(false)
      
      }
  catch(error){
  
  setLoading(false)
  message.error("Something went wrong")
  }
    }



    useEffect(()=>{
        totalAmt()
        balAmt()
        lastmonthremAmt()
     getTotalSaving()
          },[])

          const dateFormat = "YYYY/MM/DD";

const worker = {
  date: moment(new Date())
};
    
  return (
    <>
<DefaultComponent>
    
    <h1 className='my-3'>My Spending</h1>

<div className='row d-flex mt-5'>
<div className='column'>
    <div className='innercolumn'>
<Form onFinish={onFinish} initialValues={worker}>

<Form.Item label="Date" name="date"   className='dtsize'>
      {/* <DatePicker format={dateFormat} size='lg'/> */}
      <Input type='date' format={dateFormat} size="large"/>
    </Form.Item>

  <Form.Item name="amount" label="Amount">
    <Input size='large'/>
  </Form.Item>
  <Form.Item name="reason" label="Reason">
    <Input size='large'/>
  </Form.Item>
  <Form.Item label="Category" name="category">
<Select size='large'>
<Select.Option value='income'>Income</Select.Option>
<Select.Option value='expence'>Expence</Select.Option>
</Select>
</Form.Item>

  <Form.Item>
    <Button type="primary" htmlType="submit">
      Submit
    </Button>
   
  </Form.Item>
</Form>
</div>
</div>
    <div className='column1'>
    <Container fluid="md">
            <Row className='mt-5'>
            <h4>Spending Summary</h4>
            </Row>
            <Row>
            <p><b>{totalAmount}</b> rupees already spent on this month.</p>
            <p>Only <b>{remAmt}</b> rupees remaining to spend on this month.</p>
            <p> <b>{getRemainingDays()}</b> days remaining in this month</p>
            <p> Last month saving was <b>{lastMonthSaving ? lastMonthSaving:0}</b> rupees.</p>
      
           <p> Total saving <b>{totalSavings}</b> rupees, since, {firstUsedDate}</p> 
                 <h5 className='text-success'>Congrats, Great Job!</h5>
            </Row>
           
        </Container>
    </div>
</div>
   </DefaultComponent>
   </>
  )
}

export default Home
