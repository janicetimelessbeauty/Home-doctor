const express = require("express")
const pool = require("./pgadmin/pool")
const jwtMake = require('./jwtCreate')
const bcrypt = require('bcrypt');
const authenticate = require("./authenticate");
const router = express.Router();
const authentication = require("./authenticate")
router.post("/register", async(req, res) => {
    try {
      const {name, email, password, age, gender} = req.body
      const checkExist = await pool.query("SELECT * FROM customers where email = $1", [email])
      if (checkExist.rows.length != 0) {
       return res.status(401).json("Users already exist")
      }
      const salt = await bcrypt.genSalt(10)
      const hashPass = await bcrypt.hash(password, salt)
      const newUser = await pool.query('INSERT INTO customers(name, email, password, age, gender) VALUES($1, $2, $3, $4, $5) RETURNING *;', [name, email, hashPass, age, gender])
      const token = jwtMake(newUser.rows[0].id)
      res.json(token)
    }
    catch(err) {
        console.log(err.message)
        res.status(500).json("Server error")
    }
})
router.post("/login", async(req, res) => {
  try {
    const {email, password} = req.body;
    const logUser = await pool.query("SELECT * FROM customers where email = $1", [email])
    if (logUser.rows.length == 0) {
      return res.status(401).json("User doesn't exist")
    }
    const checkPass = await bcrypt.compare(password, logUser.rows[0].password)
    if (!checkPass) {
      return res.status(401).json("Wrong password")
    }
    const token = jwtMake(logUser.rows[0].id)
    res.json(token)
  }
  catch(err) {
    console.log(err.message)
    res.status(500).json("Server error")
  }
})
router.get("/verify", authentication, async(req, res) => {
  try {
     res.json(true)
  }
  catch(err) {
    console.log(err.message)
    res.status(500).send("Server error")
  }
})
module.exports = router;
