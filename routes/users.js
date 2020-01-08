const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
  res.status(200).json(results.rows)
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
  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if(error){
      throw error;
    }
  res.status(201).send(`user added with ID: ${results.insertId}`);
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

module.exports = router;
