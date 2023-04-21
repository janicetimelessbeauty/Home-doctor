import axios from 'axios'
import React, {useState} from 'react'
import {storage} from '../firebase'
import {getDownloadURL, ref, uploadBytesResumable} from'@firebase/storage'
import styled from 'styled-components'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
const AddMedi = () => {
  const [file, setFile] = useState("")
  const [medi, setMedi] = useState({
    name: "",
    rating: "",
    reviews: "",
    imgurl: ""
  })
  const [imageURL, setImageURL] = useState("")
  const handleUpload = (e) => {
    e.preventDefault()
    const storageRef = ref(storage, `/images/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on('state_changed', (snapshot) => {
      console.log(snapshot.bytesTransferred / snapshot.totalBytes * 100)
    }, 
    (err) => console.log(err.message),
    () => {
      getDownloadURL(uploadTask.snapshot.ref)
      .then(url => {setImageURL(url); console.log(imageURL)})
    })
   
    setMedi({...medi, imgurl: imageURL})
    console.log(medi)
  }
  const Addmedi = async (e) => {
    e.preventDefault()
    const response = await axios.post("http://localhost:5000/fever/addMedi", medi)
    console.log(response)
    window.location = "/fever"
  }
  return (
    <Container>
    <div className="container4">
        <form class="row g-3">
  <div class="col-md-6">
    <label for="inputEmail4" class="form-label3">Name</label>
    <input type="text" class="form-control" id="inputEmail4" onChange = {(e) => setMedi({...medi, name: e.target.value})}/>
  </div>
  <div class="col-md-6">
    <label for="inputPassword4" class="form-label3">Rating</label>
    <input type="number" class="form-control" id="inputPassword4" onChange = {(e) => setMedi({...medi, rating: e.target.value})}/>
  </div>
  <div class="col-12">
    <label for="inputAddress" class="form-label1">Reviews</label>
    <textarea type="text" class="form-control" id="inputAddress" placeholder="It is good" rows = "5" onChange = {(e) => setMedi({...medi, reviews: e.target.value})}/>
  </div>
  <div className="col-12">
    <label htmlFor="inputAddress1" class="form-label2"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1156px-Picture_icon_BLACK.svg.png" style = {{width: "60px", height: "60px", cursor: "pointer"}}alt="" />   Upload an image</label>
    <input type="file" class="form-control" id="inputAddress1" placeholder="It is good" rows = "5" style = {{display: "none"}} onChange = {(e) => setFile(e.target.files[0])}/>
    <button class = "btn btn-success" type = "btn" onClick = {(e) => handleUpload(e)}>Upload</button>
  </div>
  <div class="col-12">
    <button type="submit" class="btn btn-primary" onClick = {(e) => Addmedi(e)}>Add medication</button>
  </div>
</form>
<OwlCarousel items={2}  
          className="owl-theme"  
          loop  
          margin={48} >  
           <div><img  className="img" src= {'https://i.ytimg.com/vi/pXIKGewqzQQ/maxresdefault.jpg'}/></div>  
           <div><img  className="img" src= {'https://static.vecteezy.com/system/resources/thumbnails/002/861/723/small/cute-kawaii-avocado-with-smile-expression-vector.jpg'}/></div>  
           <div><img  className="img" src= {'https://media.istockphoto.com/id/488443474/photo/macadamia-nuts-with-leaves.jpg?s=612x612&w=0&k=20&c=8oDa1Gc6rXIyTcPgDyYXwr94L9gcNG7ScDMhb2ByAbo='}/></div>  
           <div><img  className="img" src= {'https://giavi.net/wp-content/uploads/2022/07/cong-thuc-lam-salad-ca-ngu.jpg'}/></div>  
      </OwlCarousel> 
</div>
 
    </Container>
  )
}
const Container = styled.div`
 .form-label3 {
    position: absolute;
    left: 20%;
    top: -35%;

}
.g-3 {
    margin-top: 150px;
    height: 400px;
    width: 600px;
}
.row .form-control {
    margin-left: 45px;
}
.form-label1 {
    position: absolute;
    left: 10%;
    top: -18%;
}
.inputAddress {
    margin-left: 45px;
}
.form-label2 {
    position: absolute;
    top: -35%;
    left: 10%;
}
.container4 {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-image: linear-gradient(rgba(255, 255, 255, 0.888), rgba(242, 241, 241, 0.8)), url('https://qph.cf2.quoracdn.net/main-qimg-68312844fb114d30346fbcc739a38652');
  height: 680px;
  
}
.img {
  height: 350px;
  object-fit: cover;
}
.owl-theme {
  width: 800px;
}
.owl-dot {
  background-color: #5b5555;
}
`
export default AddMedi
