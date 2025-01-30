import './App.css';
import './index.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Login';



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}/>
      </Routes>

    </Router>
  );
}



export default App;
