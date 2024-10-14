
import './App.css';
import { BrowserRouter as Router,Route,Routes,Link } from "react-router-dom"
import { SignUp } from './SignUp';
import { Login } from './Login';
import { useState,createContext } from 'react';
import { Task } from './Task';


export const AppContext =createContext()
function App() {

  
  const[SignUpdata,setSignUpdata]=useState({

  })
  const[Userdata,setUserdata] = useState({

  })
  
  return (
    <div className="App">
      



      
      <Router>
        <div>
          
          
          
        </div>
        <AppContext.Provider value={{SignUpdata,setSignUpdata,Userdata,setUserdata}}>
        <Routes>
        <Route path="/Task" element={<Task />} />  
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<SignUp />} />
         
          
        </Routes>
        </AppContext.Provider>
      </Router> 
 
      
       
        </div>
  );
}
      
    


export default App;