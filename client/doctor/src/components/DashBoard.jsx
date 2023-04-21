import React from 'react'
import styled from 'styled-components'
import {useState, useEffect} from "react"
import axios from "axios"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
const DashBoard = ({setDate}) => {
  const [active1, setActive1] = useState(true)
  const [active2, setActive2] = useState(false)
  const [prescript, setPrescript] = useState([])
  const [value, onValue] = useState(new Date())
  const [time, setTime] = useState("10:00")
  const [sentMail, setSentMail] = useState("")
  const [check, setCheck] = useState(true)
  const getPrescript = async () => {
   const prescriptData = await axios.get("http://localhost:5000/dashboard", {
      headers: {token: localStorage.getItem("token")}
   })
   console.log(prescriptData)
   setPrescript(prescriptData.data)
  }
  const sendMail = async (date, time) => {
   const sendMaila = await axios.post("http://localhost:5000/checkup", {date, time})
   console.log(sendMaila.data)
   setSentMail(sendMaila.data)
  }
  useEffect(() => {
    getPrescript()
  }, [])
  console.log(prescript)
  return (
    <Container>
       <div className="container">
        <div className="sidebar">
            <div className="head">
               <img src="https://cdn-icons-png.flaticon.com/512/6997/6997662.png" style = {{width: "40px", height: "40px"}}alt="" />
               <div className="content">
                  <div className="name">{prescript && prescript[0]?.name}</div>
                  <div className="job">Current age: {prescript && prescript[0]?.age}</div>
               </div>
            </div>
            <div className="body">
               <div className="title">Menu</div>
               <div className="ele">
                  <img src="https://cdn-icons-png.flaticon.com/512/3595/3595970.png" style = {{width: "30px", height: "30px"}} alt="" />
                  <div className="cap">Prescription</div>
               </div>
               <div className="ele">
                  <img src="https://cdn-icons-png.flaticon.com/512/5015/5015936.png" style = {{width: "30px", height: "30px"}} alt="" />
                  <div className="cap">Medical Profile</div>
               </div>
               <div className="ele">
                  <img src="https://cdn-icons-png.flaticon.com/512/6081/6081809.png" style = {{width: "30px", height: "30px"}} alt="" />
                  <div className="cap">Lifestyle secrets</div>
               </div>
               <div className="ele">
                  <img src="https://cdn-icons-png.flaticon.com/512/3147/3147124.png" style = {{width: "30px", height: "30px"}} alt="" />
                  <div className="cap">Book checkups</div>
               </div>
               <div className="ele">
                  <img src="https://cdn-icons-png.flaticon.com/512/738/738853.png" style = {{width: "30px", height: "30px"}} alt="" />
                  <div className="cap">Settings</div>
               </div>
            </div>
            
        </div>
        <div className="center">
          <div className="health">
              <div className="title">Hi, Ms {prescript && prescript[0]?.name} </div>
              <div>25% medicine purchased</div>
              <div class="progress">
                 <div class="progress-bar bg-warning" role="progressbar" style={{"width": "25%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
             </div>
          </div>
          <div className="cardbox">
          <div class="card" style={{"width": "18rem"}}>
           <img class="card-img-top" src="https://www.freevector.com/uploads/vector/preview/30890/EAT_HEALTHY_FOOD.jpg" alt="Card image cap"/>
           </div>
           <div class="card" style={{"width": "18rem"}}>
           <img class="card-img-top" src="https://img.freepik.com/free-vector/fitness-stats-concept-illustration_114360-4930.jpg" alt="Card image cap"/>
           </div>
          </div>
          <div className="purchased">
            <div className="horbar">
                <div onClick = {() => {setActive1(true); setActive2(false)}} className={active1? "prescript" : "noscript"}>
                  Prescribed medicine
                </div>
                <div onClick = {() => {setActive2(true); setActive1(false)}} className={active2? "prescript" : "noscript"}>
                  Purchased
                </div>
            </div>
            {active1 && 
            <div className="medicine">
            {prescript && prescript.map((ele) => {
               return (
                  <div className="medi">
               <img src={ele.imgurl} style = {{width: "80px", height: "80px"}} alt="" />
               <div className="info">
                   <div className="name">{ele.mediname}</div>
                   <div className="adult">{ele.adults}</div>
                   <div className="children">{ele.children}</div>
               </div>
               <img src="https://cdn-icons-png.flaticon.com/512/4320/4320357.png" style = {{width: "60px", height: "60px"}} alt="" />
            </div>
               )
            })}            
             </div>
            }
            {active2 && 
               <div className="empty">
                 <img src="https://assets.materialup.com/uploads/c83a9663-be0b-4397-b1af-67f520e44ef1/preview.png" style = {{width: "580px", height: "480px"}}alt="" />
               </div>
            }
          </div>
        </div>
        <div className = "booking">
             <div className="heade">
             <div className="sched">Book a checkup</div>
               <img src="https://cdn-icons-png.flaticon.com/512/1869/1869397.png" style = {{width: "80px", height: "80px"}} alt="" />
             </div>
            <Calendar onChange = {onValue}  value={value} />
            <button type="button" class="btn btn-success confirm"  data-toggle="modal" data-target="#exampleModal">Confirm this date</button>
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Medical checkup date {value.toLocaleDateString()}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
         {check &&
         <div className='time'>
         <div className="title">Choose checkup time</div>
         <TimePicker onChange={setTime} value={time} />
         </div>
         }
         {!check &&
            <h2>{sentMail}</h2>
         }
      </div>
      <div class="modal-footer">
        {check == false && <button type="button" class="btn btn-danger" data-dismiss="modal" onClick = {() => {setCheck(!check)}}>Close</button>}
        {check && <button type="button" class="btn btn-success" onClick = {() => {sendMail(value.toLocaleDateString(), time); setCheck(!check)}}>Book this time</button>}
      </div>
    </div>
  </div>
             </div>
             <div className="video">
             <iframe width="360" height="315" src="https://www.youtube.com/embed/r5r5448BROg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
             </div>
         </div>
        
     </div>
    </Container>
  )
}
const Container = styled.div`
.container {
   margin-left: 2px;
   display: flex;
   gap: 80px;
}
.sidebar {
   margin-top: 20px;
   display: flex;
   flex-direction: column;
   width: 350px;
   gap: 8px;
   cursor: pointer;
}
.head {
   display: flex;
   gap: 9px;
   margin-bottom: 20px;
}
.body {
   display: flex;
   flex-direction: column;
   gap: 32px;
} 
.ele {
   display: flex;
   gap: 10px;
   padding: 8px;
}
.ele:hover {
   background-color: #eaeddb;
   color: #50421e;
   
}
.center {
   margin-top: 40px;
}
.progress {
   width: 300px;
}
.health {
   display: flex;
   gap: 30px;
}
.cardbox {
   margin-top: 20px;
   display: flex;
   gap: 60px;
}
.purchased {
   margin-top: 20px;
   font-size: 18px;
   
}
.horbar {
   display: flex;
   gap: 15px;
   cursor: pointer;
}
.prescript {
   color: rebeccapurple;
   border-bottom: 2px solid rebeccapurple;
   padding: 8px;
}
.noscript {
   padding: 8px;
}
.medi {
   margin-top: 15px;
   display: flex;
   gap: 135px;
}
.info {
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   cursor: pointer;
}
.name {
   font-size: 20px;
   font-weight: 700;
}
.adult {
   color: #368a56;
}
.children {
   color: #e3a02d;
}
.heade {
   display: flex;
   gap: 23px;
   font-size: 30px;
   font-weight: bold;
   justify-content: center;
   margin-top: 20px;
}
.confirm {
   margin-top: 15px;
}
.time {
   display: flex;
   gap: 23px;
}
.title {
   font-size: 16px;
   font-weight: bold;

}
.modal-body {
   display: flex;
   flex-direction: column;
   gap: 14px;
}
.video {
   margin-top: 20px;
}
`
export default DashBoard