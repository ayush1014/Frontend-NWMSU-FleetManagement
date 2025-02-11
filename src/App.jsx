import './App.css';
import './index.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Login';
// import api from './Config/axios';



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
      </Routes>

    </Router>
  );
}



export default App;
