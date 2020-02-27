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

router.get('/', function(req, res, next) {
    pool.query('SELECT * FROM blogentries ORDER BY id ASC', (error, results) =>{
        if(error){
            throw error;
        }
        res.status(200).json(results.rows);
    });
});

router.get('/:id', function(req, res, next){
    pool.query('SELECT * FROM blogentries WHERE id = $1', [req.params.id], (error, results) => {
      if(error){
        throw error;
      }
    res.status(200).json(results.rows);
    });
  });

router.post('/new/:title-:content-:img_link-:user_id', function( req, res, next ) {
    let {title, content, img_link, user_id} = req.params;
    pool.query('INSERT INTO blogentries (title, content, img_link, user_id)  VALUES($1, $2, $3, $4) RETURNING id', 
    [title, content, img_link, user_id], (error, results) => {
        if(error){
            throw error;
        }
        console.log(`Entry added successfully id: ${results.rows[0].id}`)
        res.status(201).json(results.rows[0]);
    });
});

router.put('/edit/:id-:title-:content-:img_link-:user_id', function(req, res, next){
    let{id, title, content, img_link, user_id} = req.params;
    pool.query('UPDATE blogentries SET title = $2, content = $3, img_link = $4, user_id = $5 WHERE id = $1', [id, title, content, img_link, user_id], (error, results) => {
        if(error){
          throw error;
        }
      res.status(200).send(`Entry edited with ID: ${id}`);
      });
});


router.delete('/:id', function(req, res){
    let {id} = req.params;
    pool.query('DELETE FROM blogentries WHERE id = $1', [id], (error, results) => {
        if(error){
            throw error;
        }
        console.log(`Entry Removed successfully id: ${id}`)
        res.status(200).send(`Entry deleted successfully with id: ${id}`);
    })
});

module.exports = router;