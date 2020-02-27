const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
  res.status(200).json(results.rows);
  });
});

router.get('/:id', function(req, res, next){
  pool.query('SELECT * FROM users WHERE id = $1', [req.params.id], (error, results) => {
    if(error){
      throw error;
    }
  res.status(200).json(results.rows);
  });
});

router.post('/new/:name-:email', function(req,res,next){
  let {name, email} = req.params;
  pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id', [name, email], (error, results) => {
    if(error){
      throw error;
    } 
    console.log(`user added successfully id: ${results.rows[0].id}`)
    res.status(201).json(results.rows[0]);
  });
 
  
});

router.put('/edit/:id-:name-:email', function(req,res,next){
  let {id, name, email} = req.params;
  pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id], (error, results) => {
    if(error){
      throw error;
    }
  res.status(200).send(`user edited with ID: ${id}`);
  });
});

router.delete('/:id', function(req,res){
  let {id} = req.params;
  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) =>{
    if(error){
      throw error;
    }
    res.status(200).send(`User deleted successfully with id: ${id}`);
  })
});

module.exports = router;
