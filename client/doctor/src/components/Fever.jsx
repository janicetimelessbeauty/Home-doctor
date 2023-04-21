import React, { useEffect, useState } from 'react'
import axios from "axios"
import {Link} from 'react-router-dom'
import styled from 'styled-components'
const Fever = () => {
  const [fevers, setFevers] = useState([])
  const [sidebar, setSideBar] = useState(false)
  const [patient, setPatient] = useState("")
  const [customerlist, setCustomerList] = useState(false)
  const [customers, setCustomers] = useState([])
  const [prescripts, setPrescripts] = useState([])
  const [ID, setID] = useState("")
  const [feverData, setFeverData] = useState({
       name: "",
       reviews: "",
       rating: "" 
  })
  
  const getFever = async () => {
      const {data} = await axios.get("http://localhost:5000/fever")
      setFevers(data);
  }
  useEffect(() => {
    getFever();
  }, [])
  console.log(fevers)
  const editFever = async (e, id) => {
    console.log(id)
    e.preventDefault();
    const response = await axios.put(`http://localhost:5000/fever/updateMedi/${ID}`, feverData)
    window.location = "/fever"
  }
  const closeNav = () => {
      setSideBar(!sidebar)
  }
  const handleKeyDown = async (e) => {
    if (e.key == "Enter") {
       console.log(patient);
       const customer = await axios.post("http://localhost:5000/fever/getPatient", {
             patient: patient
       })
       setCustomers(customer.data)
    }
  }
  const insertPrescript = async (name, rating, adults, children) => {
         const insertPrescript = await axios.post("http://localhost:5000/fever/updatePrescript", {
          patient: patient,
          rating: rating,
          mediname: name,
          adults: adults,
          children: children
         })
         const getPrescript = await axios.post("http://localhost:5000/fever/getPrescript", {
           customer: patient
         })
         setPrescripts(getPrescript.data)
  }
  const getPrescript = async (customer) => {
    const prescript = await axios.post("http://localhost:5000/fever/getPrescript", {
             customer: customer
    })
    console.log(prescript)
    setPrescripts(prescript.data)
  }
  return (
    <Container>
    <div className = "container3">
    <span className = {sidebar? "none" : "appear"}onClick={() => closeNav()}>&#9776;</span>
    <div>
        <div className = {sidebar?"sidebar-open":"sidebar-close"} id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <button type="button" class= {sidebar? "appear close" : "none"} aria-label="Close" onClick = {() => closeNav()}>x</button>
        <a className = {sidebar? "nav-link appear" : "none"}id="v-pills-home-tab"  role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a>
        <a  className = {sidebar? "nav-link appear" : "none"} id="v-pills-profile-tab"  role="tab" aria-controls="v-pills-profile" aria-selected="false">Diabetes</a>
        <a  className = {sidebar? "nav-link appear" : "none"} id="v-pills-messages-tab"  role="tab" aria-controls="v-pills-messages" aria-selected="false">Hear disease</a>
        <a  className = {sidebar? "nav-link appear" : "none"} id="v-pills-settings-tab" role="tab" aria-controls="v-pills-settings" aria-selected="false">Log out</a>
        </div>
      </div>
    <div className = "container2">
      {
        fevers.map((fever) => {
          return (
            <div class="card" style = {{width: "18rem", height: "34rem"}}>
            <img src={fever.imgurl} class="card-img-top" alt="..."/>
            <div class="card-body">
            <h5 class="card-title">{fever.name}</h5>
            <p class="card-text">{fever.reviews}</p>
            <button type="button" onClick = {() => setID(fever.id)}class="btn btn-danger" data-toggle="modal" data-target="#exampleModal" style = {{marginRight: "18px"}}>
                Edit
            </button>
            <a href="#" class="btn btn-warning" onClick = {() => {insertPrescript(fever.name, fever.rating, fever.adults, fever.children)}}>Add to cart</a>
             </div>
             <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Edit medicine information</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                 <form action="">
                 <div class="form-group">
                  <label for="exampleInputEmail1">Name of medicine</label>
                  <input type="text" class="form-control" onChange = {(e) => setFeverData({...feverData, name: e.target.value})}id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="ex. Paracetamol"/>
                 </div>
                 <div class="form-group">
                 <label for="exampleFormControlTextarea1">Reviews</label>
                 <textarea class="form-control" onChange = {(e) => setFeverData({...feverData, reviews: e.target.value})} id="exampleFormControlTextarea1" rows="3"></textarea>
                 <div class="form-group">
                <label for="exampleFormControlSelect1">Ratings</label>
                <select class="form-control" id="exampleFormControlSelect1" value = {feverData.rating} onChange = {(e) => setFeverData({...feverData, rating: e.target.value})}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                </select>
                </div>
                 </div>
                 </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-success" onClick = {(e) => {editFever(e, fever.id)}}>Save changes</button>
              </div>
            </div>
          </div>
             </div>
            </div> 
          )
          })
      }
    </div>
    <button type="button" class="btn btn-danger" style = {{height: "70px", width: "150px"}} data-bs-toggle="modal" data-bs-target="#exampleModal1">
    <Link to = '/addMedicine' style = {{textDecoration: "none", color: "white"}}>Add a medicine</Link>
    </button>
    <div className="prescript">
       <input type="text" class="form-control search" id="exampleFormControlInput1" value = {patient} placeholder="Patient's name" onChange = {(e) => setPatient(e.target.value)} onKeyDown = {(e) => {handleKeyDown(e); setCustomerList(true)}}/>
       <div className="sbar">
       { customerlist &&
          customers.map((customer) => { return (
             <div className="name" onClick = {() => {setPatient(customer.name);getPrescript(customer.name); setCustomerList(false)}}>{customer.name}</div>
        )})
       }
       </div>
       <span><div className="title">Prescription</div>
       <img style = {{width: "32px", height: "32px"}}src="https://img.lovepik.com/free-png/20210918/lovepik-shopping-bag-png-image_400256468_wh1200.png" alt="" /></span>
       {prescripts.map((prescript) => {return (<div className="item">
        <img style = {{width: "92px", height: "92px"}}src={prescript.imgurl} alt="" />
        <div className="info">
          <div className="name1">{prescript.mediname}</div>
          <div className="rating">Rating <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span></div>
          <div className="dose">Adult <img style = {{width: "32px", height: "32px"}} src="https://media.istockphoto.com/id/1186766314/vector/people-line-icon.jpg?s=612x612&w=0&k=20&c=3_g-czGOTMmFj9b4TxHyj9e8EwtIRUyhVGQ1ITUG0nU=" alt="" />{prescript.adults}</div>
          <div className="dose">Children <img style = {{width: "20px", height: "20px"}} src="https://media.istockphoto.com/id/1178790725/vector/children-icon.jpg?s=612x612&w=0&k=20&c=_ggpEjkGoyF9pDwJBOvCSrfpPSDgGzdUaRJCcKIrYGE=" alt="" />{prescript.children}</div>
        </div>

       </div>)})}
    </div>
    </div>
    </Container>
  )
}
const Container = styled.div`
  .container3 {
  display: flex;
  gap: 15px;
  background-image: linear-gradient(rgba(255, 255, 255, 0.849), rgba(242, 241, 241, 0.342)), url('https://i.pinimg.com/originals/ee/84/e6/ee84e6c4f71311cac5b0624e31ea9b51.gif');
  width: 100%;
  height: 1080px;
}
.container2 {
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: 50% 50%;
  gap: 10px;

}
.sidebar-open {
  width: 400px;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  height: 100vh;
  font-size: 20px;
}
.sidebar-close {
  width: 0px;

}
.none {
  display: none;
}
.close {
  padding-right: 10px;
}
.appear {
  display: block;
  font-size: 30px;
  cursor: pointer;
  padding-bottom: 20px;
}
a {
  color: white;
}
a:hover {
  background-color: #2c112c60;
}
.search {
  border-radius: 5px;
  margin-top: 20px;
}
.prescript {
  background-color: #eeeeda;
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow-y: scroll;
}
.item {
  display: flex;
  justify-content: space-around;
  background-color: white;
  border: 1px solid orange;
  border-radius: 5px;
}
.info {
   padding-left: 2px;
   color: #316e5b;
   font-family: 'Times New Roman', serif;
   font-weight: 700;
   font-style: italic;
}
.title {
  font-family: 'Times New Roman', serif;
  font-weight: 700;
  color: #7d3a50c7;
  font-size: 23px;
}
span {
  display: flex;
  gap: 15px;
  justify-content: center;
}
.rating {
  display: flex;
  align-items: center;
  gap: 4px;
}
.checked {
  color: orange;
}
.dose {
  display: flex;
  gap: 4px;
  align-items: center;
}
.sbar {
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 4px;
}
.name {
  font-size: 17px;
  color: #635d5d;
  font-weight: 600;
  font-family: 'Times New Roman', serif;
}
.name:hover {
  background-color: #c6e05f;
  cursor: pointer;
  font-weight: 800;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}
::-webkit-scrollbar {
  width: 15px;
  background-color: red;
}

`
export default Fever