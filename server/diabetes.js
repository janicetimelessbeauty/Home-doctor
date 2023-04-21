const express = require('express')
const pool = require("./pgadmin/pool")
const router = express.Router();
router.get('/', async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM diabetes;")
        res.json(response.rows)
    }
    catch(err) {
        console.error(err.message)
    }  
})
router.post('/addMedi', async (req, res) => {
    try {
        const {name, dose, combination} = req.body;
        const newMedi = await pool.query('INSERT INTO fevermed(name, dose, combination) VALUES($1, $2, $3) RETURNING *;', [name, dose, combination])
        res.json(newMedi)
    }
    catch(err) {
        console.error(err.message)
    }
})
router.put('/updateMedi/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {name, dose, combination} = req.body
        const updateMedi = await pool.query('UPDATE fevermed SET name = $1, dose = $2, combination = $3 WHERE id = $4;', [name, dose, combination, id])
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
module.exports = router;