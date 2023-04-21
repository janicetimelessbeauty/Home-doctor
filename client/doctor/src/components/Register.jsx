import React from 'react'
import styled from 'styled-components'
import axios from "axios"
import { useState } from 'react'
import { Link } from 'react-router-dom'
const Register = ({setAuth}) => {
  const [signer, setSigner] = useState({
    name: "",
    email: "",
    gender: "Female",
    age: "",
    password: ""
  })
  const registerUser = async (e) => {
    e.preventDefault();
    console.log(signer);
    const tokenUser = await axios.post("http://localhost:5000/user/register", signer)
    console.log(tokenUser);
    localStorage.setItem("token", tokenUser.data);
    setAuth(true);
  }
  return (
    <Container>
        <div className="container">
            <div className="form">
                <form action="">
                    <h2>Registration</h2>
                    <label for="exampleInputEmail1">Name</label>
                    <input type="text" name = "name" onChange = {(e) => {setSigner({...signer, [e.target.name]: e.target.value})}} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name"/>
                    <label for="exampleInputPassword1">Email</label>
                    <input type="email" name = "email" onChange = {(e) => {setSigner({...signer, [e.target.name]: e.target.value})}} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    <label for="exampleInputEmail1">Gender</label>
                    <div className="gender">
                    <input type="radio" name = "gender" value = "Female" onChange = {(e) => {setSigner({...signer, [e.target.name]: e.target.value}); console.log(signer)}} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name" checked/>
                    <label htmlFor="">Female</label>
                    </div>
                    <div className="gender">
                    <input type="radio"  id="exampleInputEmail1" value = "Male" onChange = {(e) => {setSigner({...signer, [e.target.name]: e.target.value});console.log(signer)}} aria-describedby="emailHelp" placeholder="Enter name" name = "gender"/>
                    <label htmlFor="">Male</label>  
                    </div>
                    <label htmlFor="">Age</label>
                    <input type="number" name = "age" onChange = {(e) => {setSigner({...signer, [e.target.name]: e.target.value})}} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter age"/> 
                    <label htmlFor="">Password</label>
                    <input type="password" name = "password" onChange = {(e) => {setSigner({...signer, [e.target.name]: e.target.value})}} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter password"/>  
                    <button type = "submit" class = "btn btn-success" onClick = {(e) => {registerUser(e)}}>Register now</button>
                    <div className="register"><Link to = "/login">Login here</Link></div>
                    <button type = "btn" class = "btn btn-danger"><Link to = "/"><div className = "letter">Not a patient ?</div></Link></button>
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
.gender {
    display: flex;
    gap: 8px;
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
.btn {
  text-decoration: none;
}
`
export default Register