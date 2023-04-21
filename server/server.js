const express = require("express")
const cors = require("cors")
const feverRoutes = require("./fever")
const diabetesRoutes = require("./diabetes")
const userRoutes = require("./userPatient")
const dashboardRoutes = require("./dashboard")
const sgMail = require('@sendgrid/mail')
const app = express()
app.use(express.json())
app.use(cors())
const PORT = 5000
app.listen(PORT, () => {
    console.log("Server starting on port 5000")
})
const apiKey = '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'
sgMail.setApiKey(apiKey)

app.use('/fever', feverRoutes)
app.use('/diabetes', diabetesRoutes)
app.use('/user', userRoutes)
app.use('/dashboard', dashboardRoutes)
app.post('/checkup', async(req, res) => {
    try {
    console.log(req.body)
    const message = {
    to: 'nancyaladaide@gmail.com',
    from: {
        name: 'homedoctor',
        email: 'nga08102004@gmail.com'
    },
    subject: 'Checkup confirmation',
    text: `Your confirmed check up date is ${req.body.date}`,
    html: `<h2>Hi, thank you for booking a check-up with us. Your check-up date is ${req.body.date}</h2>
           <h2 style = "color: red">Note the time: ${req.body.time}</h2>
           <h3>Doctor: Samantha</h3>
           <img src = "https://media.tenor.com/dxF_lVsrr7IAAAAd/bento-food.gif" style = "width: 280px; height: 200px;" alt = ""/>
    `
    }
    console.log("Exe")
    sgMail
    .send(message)
    .then((response) => console.log("Email sent"))
    .catch(error => console.log(error.message))
    res.status(201).json("Thank you for booking a checkup")
    }
    catch(err) {
        console.log(err.message)
    }
})

