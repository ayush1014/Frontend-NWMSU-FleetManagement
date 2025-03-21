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
import { ProtectedRoute } from './AppContext/protectedRouteContext';
// import api from './Config/axios';



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
          <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/Users' element={<ProtectedRoute><Users /></ProtectedRoute>} />
          <Route path='/Vehicles' element={<ProtectedRoute><Vehicle /></ProtectedRoute>} />
          <Route path="/add-vehicles" element={<ProtectedRoute><AddVehicles /></ProtectedRoute>} />
          <Route path="/add-users" element={<ProtectedRoute><AddUsers /></ProtectedRoute>} />
      </Routes>

    </Router>
  );
}



export default App;
