import React from 'react'
import "../resources/DefaultComponent.css"
import {  Dropdown} from 'antd';
import { useNavigate } from 'react-router-dom';
//import { Navbar,Nav,Container,NavDropdown} from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function DefaultComponent(props) {

  const user=JSON.parse(localStorage.getItem("SnupaSpending"))
  const navigate=useNavigate();


    const items = [
        {
          key: '1',
          label: (
            <a onClick={()=>{
              navigate("/maxbudget")
            }}>
        Budget Settings
            </a>
          ),
        },
       
        {
          key: '2',
          label: (
            <a onClick={()=>{

              navigate("/analytics")
            }}>
           Analytics
            </a>
          ),
        },
        {
          key: '3',
          label: (
            <a onClick={()=>{
              localStorage.removeItem("SnupaSpending")
              navigate("/login")
            }}>
           Logout
            </a>
          ),
        }
        
      ];

  return (
//     <>
//     <div className='header d-flex text-white bg-info justify-content-center'>
//         <div className='head'>
//     <h3>my <em><u><b>spending</b></u></em> trend</h3>
//     </div>
//     <div className='home'>
      
//     </div>

//     <div className='ddl'>
//     <Dropdown
//         menu={{
//           items,
//         }}
//         placement="bottomLeft"
//       >
//         <button className='primary'>{user.name}</button>
//       </Dropdown>
//       </div>

// </div>
//       <div className='content'>
//       {props.children}
//     </div>
//     </>
<>
<Navbar bg="info" expand="lg">
<Container>
  <Navbar.Brand href="#home">  <h3>my <em><u><b>spending</b></u></em> trend</h3></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/maxbudget">Settings</Nav.Link>
      <Nav.Link href="/analytics">Analytics</Nav.Link>
      <NavDropdown title={user.name} id="basic-nav-dropdown" className='navbar-nav ml-auto'  >
     
        <NavDropdown.Item className='navitem'  onClick={()=>{
              localStorage.removeItem("SnupaSpending")
              navigate("/login")
            }}>
          Logout
        </NavDropdown.Item>
        
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
</Container>
</Navbar>

<div className='content'>
      {props.children}
   </div>
   </>
  )
}

export default DefaultComponent;
