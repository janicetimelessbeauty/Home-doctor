const jwt = require("jsonwebtoken")
require("dotenv").config()
module.exports = async(req, res, next) => {
    try {
    const jwtToken = req.headers["token"]
    if(!jwtToken) {
        return res.status(403).json("Not authorize")
    }
    const payload = jwt.verify(jwtToken, process.env.jwtSecret)
    req.patient = payload.patient
    next();
    }
    catch(err) {
        console.log(err.message)
        return res.status(403).json("Not authorize")
    }
}