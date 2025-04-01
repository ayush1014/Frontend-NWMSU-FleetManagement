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
import UserProfile from './UserProfile';
import UserTemp from './userTemp';
import VehicleProfile from './VehicleProfile';
import AddRefueling from './AddRefueling';
import AddMaintainence from './AddMaintainence';
import Refueling from './Refueling';
import Maintenance from './Maintainence';
import VehicleRefueling from './VehicleRefueling';
import VehicleMaintenence from './VehicleMaintenence';



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
          <Route path="/user-profile" element={<ProtectedRoute><UserProfile/></ProtectedRoute>}/>
          <Route path="/user-temp" element={<ProtectedRoute><UserTemp/></ProtectedRoute>}/>
          <Route path="/vehicle-profile/:NWVehicleNo" element={<ProtectedRoute><VehicleProfile/></ProtectedRoute>}/>
          <Route path='/add-refueling' element={<ProtectedRoute><AddRefueling/></ProtectedRoute>}/>
          <Route path='/add-maintainence' element={<ProtectedRoute><AddMaintainence/></ProtectedRoute>}/>
          <Route path='/refueling' element={<ProtectedRoute><Refueling/></ProtectedRoute>}/>
          <Route path='/maintenance' element={<ProtectedRoute><Maintenance/></ProtectedRoute>}/>
          <Route path='/vehicleRefueling/:NWVehicleNo' element={<ProtectedRoute><VehicleRefueling/></ProtectedRoute>}/>
          <Route path='/vehicleMaintence/:NWVehicleNo' element={<ProtectedRoute><VehicleMaintenence/></ProtectedRoute>}/>
      </Routes>

    </Router>
  );
}



export default App;
