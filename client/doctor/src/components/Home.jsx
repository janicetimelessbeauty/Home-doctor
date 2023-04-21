import React, { useEffect, useState } from 'react'
import Vector from "../assets/vector.gif"
import Doctor from "../assets/doctor.jpg"
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const Home = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  })
  return (
    <Container>
    <div>
        {isLoading && <img src = {Vector} className = "img1"/>}
        {!isLoading && <div className="canvas background">
            <div className="title">Pick your's patient illness</div>
            <div className = "container">
            <div className="card" style = {{width: "18rem", height: "26rem"}}>
               <img className="card-img-top" src="https://cdn.dribbble.com/users/371697/screenshots/10859474/media/43fdf597373100ffef10806ec237b340.png?compress=1&resize=400x300" alt="Card image cap"/>
               <div className="card-body">
               <h5 className="card-title">Doctor</h5>
               <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
               <a><Link to = "/fever" className="btn btn-warning">Give prescription</Link></a>
            </div>
            </div>
            <div className="card" style = {{width: "18rem", height: "26rem"}}>
               <img className="card-img-top" src="https://media.istockphoto.com/id/1272421423/vector/tiny-doctor-insert-sample-with-blood-into-digital-glucose-meter-to-control-diabetes-sickness.jpg?s=612x612&w=0&k=20&c=9psWuFkPYuElNXLHByS6pxkj45N2icgFE3ep6oOxZ8s=" alt="Card image cap"/>
               <div className="card-body">
               <h5 className="card-title">User</h5>
               <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
               <a><Link to = "/dashboard" className="btn btn-success">See prescription</Link></a>
            </div>
            </div>
            <div className="card" style = {{width: "18rem", height: "26rem"}}>
               <img className="card-img-top" src="https://media.istockphoto.com/id/1281057675/vector/red-heart-shape-and-heartbeat-symbol-cardiogram-health-care-concept.jpg?s=612x612&w=0&k=20&c=JVuqYoscdPprygbgiTP9yJtBn27YiR1fk4psTfL2DW0=" alt="Card image cap"/>
               <div className="card-body">
               <h5 className="card-title">Heart disease</h5>
               <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
               <a href="#" className="btn btn-danger">Go somewhere</a>
            </div>
            </div>
            </div>
        </div>}
    </div>
    </Container>
  )
}
const Container = styled.div`
 .img1 {
    width: 100%;
    height: 100%;
}
.canvas {
    background-image: linear-gradient(rgba(255, 255, 255, 0.849), rgba(242, 241, 241, 0.942)), url('https://cdn.dribbble.com/users/4617613/screenshots/14162661/media/2c1687a8752cc5ede0520a4856213b48.gif');
    width: 100%;
    height: 1080px;
}
.title {
    font-size: 40px;
    position: absolute;
    top: 10%;
    left: 35%;
    color: rgb(124, 62, 124);
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    top: 25%;
    left: 15%;
}
.card {
    border-radius: 8px;
    background-color: rgb(245, 246, 248);
    cursor: pointer;
}
.card:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
.nav-link {
    margin-bottom: 35px;
    color: white;
}
.active {
    background-color: rgb(183, 84, 84);
}
.nav-link:focus {
    background-color: rgba(248, 191, 92, 0.559);
} 
`
export default Home