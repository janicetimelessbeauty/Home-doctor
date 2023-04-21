const express =  require('express')
const authentication = require('./authenticate')
const pool = require('./pgadmin/pool')
const router = express.Router()
router.get("/", authentication, async(req, res) => {
    try {
        const id = req.patient
        const prescript = await pool.query("SELECT customers.name, customers.age, medicine.mediname, medicine.adults, medicine.children, fevermed.imgurl FROM customers INNER JOIN medicine on customers.name = medicine.name INNER JOIN fevermed on medicine.mediname = fevermed.name where customers.id = $1", [id]);
        res.status(200).json(prescript.rows)
    }
    catch(err) {
        res.status(401).send("Authentication error")
    }
})
module.exports = router