import './App.css';
import './index.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Login';
import Home from './Home';
import Dashboard from './Navigation';
import Users from './Users';
import Vehicle from './Vehicle';
import AddUsers from './AddUsers'
import AddVehicles from './AddVehicles';
// import api from './Config/axios';



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/Users' element={<Users/>}/>
        <Route path='/Vehicles' element = {<Vehicle/>}/>
        <Route path="/add-vehicles" element={<AddVehicles/>}/>
        <Route path="/add-users" element={<AddUsers/>}/>
      </Routes>

    </Router>
  );
}



export default App;
