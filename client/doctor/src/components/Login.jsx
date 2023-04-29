import React from 'react'
import axios from "axios"
import styled from "styled-components"
import {useState} from "react"
import { Link } from 'react-router-dom'
const Login = ({setAuth}) => {
  const [signer, setSigner] = useState({
    email: "",
    password: ""
  })
  const logUser = async (e) => {
    e.preventDefault();
    const logToken = await axios.post("http://localhost:5000/user/login", signer)
    console.log(logToken.data)
    localStorage.setItem("token", logToken.data)
    setAuth(true);
  }
  return (
    <Container>
      <div className="container">
        <div className="form">
            <form action="">
            <label for="exampleInputPassword1">Email</label>
            <input type="email" name = "email" onChange = {(e) => {setSigner({...signer, [e.target.name]: e.target.value})}} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required/>
            <label htmlFor="">Password</label>
            <input type="password" name = "password" onChange = {(e) => {setSigner({...signer, [e.target.name]: e.target.value})}} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter password" required/> 
            <button type = "submit" class = "btn btn-success" onClick = {(e) => {logUser(e)}}>Login now</button>
            <div className="register"><Link to = "/register">Not login yet ? Register here</Link></div>
            <button type = "btn" class = "btn btn-danger"><Link to = "/"><div class = "letter">Not a patient ?</div></Link></button>
            </form>
        </div>
    </div>
    </Container>   
  )
}
const Container = styled.div`
form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    width: 500px;
    margin-top: 30px;
}
button {
    margin-top: 9px;
} 
.register {
  color: green;
  cursor: pointer;
}
.letter {
  color: white;
  text-decoration: none;
} 
 
`
export default Login