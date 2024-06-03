
import Login from './components/Login'
import Navbar from "./components/Nav";
import {Route,Routes} from 'react-router-dom'
import Signup from "./components/SignUp";
import PdfMaker from './components/PdfMaker';

function App() {
 
  return (
    <>
    <Navbar/>
    <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/PdfMaker" element={<PdfMaker/>}></Route>
    </Routes>
    </>
    
    
   
    
  )
}

export default App