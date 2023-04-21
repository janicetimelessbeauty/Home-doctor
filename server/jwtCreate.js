const jwt = require("jsonwebtoken")
require("dotenv").config()
const jwtMake = (id) => {
    const payload = {
        patient: id
    }
    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: "2hr"})
}
module.exports = jwtMake