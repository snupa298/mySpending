import { message, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import DefaultComponent from '../components/DefaultComponent'
import { EditOutlined,DeleteOutlined} from '@ant-design/icons';
import "../resources/analytics.css"
import moment from "moment"
import axios from 'axios'


function Analytics() {

const navigate=useNavigate();
const[frequency,setFrequency]=useState('7')
const [transactionsData,setTransactionsData]=useState([])
const[loading,setLoading]=useState(false)
const[selectedItemForEdit,setselectedItemForEdit]=useState(null)

const columns = [
    {
      title:'Date',
      dataIndex:'date',
       render:(text)=><span>{moment(text).format('YYYY-MM-DD')}</span>
    },
    {
      title:'Amount',
      dataIndex:'amount'
    },
    {
      title:'Category',
      dataIndex:'category'
    },
    {
      title:'Reason',
      dataIndex:'reason'
    },
    {
      title:'Actions',
      dataIndex:'actions',
      render:(text,record)=>{
        return <div>
          <EditOutlined onClick={()=>{
            setselectedItemForEdit(record)
            navigate("/")
          }} />
          <DeleteOutlined className='mx-3' onClick={()=>deleteTransaction(record)}/>
        </div>
      }
    }
    
  ]

  const getTransactions=async ()=>{
    try{
      const user = JSON.parse(localStorage.getItem("SnupaSpending"))
     // console.log(user)
        setLoading(true)
       const response = await axios.post("/api/tr/getalltrans",
       {userId:user._id,
        frequency
      })
   
     setTransactionsData(response.data.transactions)
    //setLoading(false)
    }
   
catch(error){

setLoading(false)
message.error("Something went wrong")
}

}

const deleteTransaction=async (record)=>{
  try{

      setLoading(true)
     const response = await axios.post("/api/tr/delete-transaction",{
transactionId:record._id
     })
message.success("Transaction deleted successfully")
getTransactions()
setLoading(false)
  }
catch(error){

setLoading(false)
message.error("Something went wrong")
}
}

useEffect(()=>{
    getTransactions()
        },[frequency])

  return (
 <DefaultComponent>
           <div className='filter d-flex justify-content-between align-items-center'>
<div className='d-flex'>
<div className='d-flex flex-column'>
  <h6>Select frequency</h6>
  <Select value={frequency} onChange={(value)=>setFrequency(value)}>
    <Select.Option value='7'>Last 1 week</Select.Option>
    <Select.Option value='30'>Last 1 month</Select.Option>
    <Select.Option value='365'>Last 1 year</Select.Option>

  </Select>


</div>


</div>
<div className='d-flex'>
  
  <button className='success' onClick={()=>navigate("/")}>ADD NEW</button>
</div>
   </div>

   <div className='table-analytics'>
 <div className='table'>
 <Table columns={columns} dataSource={transactionsData}/>

</div>
   </div>
    </DefaultComponent> 
    )

}

export default Analytics


