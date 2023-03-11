import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css';
import Analytics from "./pages/Analytics";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MaxBudget from "./pages/MaxBudget";
import Register from "./pages/Register";


function App() {
  return (
    <div className='App'>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/maxbudget' element={<MaxBudget/>}/>
    <Route path='/analytics' element={<Analytics/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
