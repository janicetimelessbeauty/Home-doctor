const express = require('express')
const pool = require("./pgadmin/pool")
const router = express.Router();
router.get('/', async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM fevermed;")
        res.json(response.rows)
    }
    catch(err) {
        console.error(err.message)
    }  
})
router.post('/addMedi', async (req, res) => {
    try {
        const {name, rating, reviews, imgurl, adults, children} = req.body;
        const newMedi = await pool.query('INSERT INTO fevermed(name, rating, reviews, imgURL, adults, children) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;', [name, rating, reviews, imgurl, adults, children])
        res.json(newMedi)
    }
    catch(err) {
        console.error(err.message)
    }
})
router.put('/updateMedi/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {name, rating, reviews} = req.body
        const updateMedi = await pool.query('UPDATE fevermed SET name = $1, rating = $2, reviews = $3 WHERE id = $4;', [name, rating, reviews, id])
        res.json("Medi is updated")
    }
    catch(err) {
        console.error(err.message)
    }
})
router.delete('/deleteMedi/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const deleteMedi = await pool.query('DELETE FROM fevermed WHERE id = $1;', [id])
        res.json("Medi is deleted")
    }
    catch(err) {
        console.error(err.message)
    }
})
router.post('/getPatient', async (req, res) => {
    try {
        const {patient} = req.body;
        const selectPatient = await pool.query('SELECT * FROM customers WHERE LOWER(name) LIKE $1;', ['%' + patient.toLowerCase() + '%'])
        res.json(selectPatient.rows)
    }
    catch(err) {
        console.error(err.message)
    }
})
router.post('/getPrescript', async(req, res) => {
    try {
        const {customer} = req.body;
        const selectCustomer = await pool.query('select medicine.name, mediname, medicine.adults, medicine.children, fevermed.imgurl from medicine INNER JOIN fevermed ON medicine.mediname = fevermed.name where medicine.name = $1;', [customer])
        res.json(selectCustomer.rows)
    }
    catch(err) {
        console.error(err.message)
    }
})
router.post('/updatePrescript', async(req, res) => {
    try {
        const {patient, rating, mediname, adults, children} = req.body;
        const insertPrescript = await pool.query('INSERT INTO medicine(name, rating, mediname, adults, children) VALUES($1, $2, $3, $4, $5) RETURNING *;', [patient, rating, mediname, adults, children])
        res.json(insertPrescript)
    }
    catch(err) {
        console.error(err.message)
    }
})
module.exports = router;