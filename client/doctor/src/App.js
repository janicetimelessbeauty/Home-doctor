import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Fever from './components/Fever';
import Diabetes from './components/Diabetes';
import Register from './components/Register';
import Login from "./components/Login"
import DashBoard from './components/DashBoard';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import AddMedi from './components/AddMedi';
import { useState, useEffect } from 'react';
import axios from "axios"

function App() {
  const [auth, setAuth] = useState(false);
  
  const checkAuth = async () => {
     const verify = await axios.get("http://localhost:5000/user/verify", {
         headers: {token: localStorage.getItem("token")}
     })
     console.log(verify)
     verify ? setAuth(true) : setAuth(false)
  }
  useEffect(() => {
    checkAuth()
    console.log(auth)
  })
  return (
    <div className="App">
      <BrowserRouter>
         <Routes>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/fever" element = {<Fever/>}/>
          <Route path = "/diabetes" element = {<Diabetes/>}/>
          <Route path = "/addMedicine" element = {<AddMedi/>}/>
          <Route path = "/register" element = {auth ? <Navigate to = "/dashboard"/> : <Register setAuth = {setAuth}/>}/>
          <Route path = "/login" element = {auth ? <Navigate to = "/dashboard"/> : <Login setAuth = {setAuth}/>}/> 
          <Route path = "/dashboard" element = {auth ? <DashBoard /> : <Navigate to = "/login"/>}/>
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
