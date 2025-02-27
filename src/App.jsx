import './App.css';
import './index.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Login';
import Home from './Home';
import Dashboard from './Navigation';
import Users from './Users';
import Vehicle from './Vehicle';
// import api from './Config/axios';



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/Dashboard' element= {<Dashboard/>}/>
        <Route path='/Users' element={<Users/>}/>
        <Route path='/Vehicles' element = {<Vehicle/>}/>
      </Routes>

    </Router>
  );
}



export default App;
