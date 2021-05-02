require('dotenv').config();

const fs = require('fs');
const qs = require('querystring');
const router = require('express').Router();
const Huga = require('../models/huga');
const token = process.env.TOKEN;

// Find All
router.get('/', (req, res) => {
  Huga.findAll()
    .then((hugas) => {
      if (!hugas.length) return res.status(404).send({ err: 'Huga not found' });
      res.send(`find successfully: ${hugas}`);
    })
    .catch(err => res.status(500).send(err));
});

// Find One by hugadate
router.get('/hugadate/:hugadate', (req, res) => {
  Huga.findOneByHugadate(req.params.hugadate)
    .then((huga) => {
      if (!huga) return res.status(404).send({ err: 'Huga not found' });
      res.send(`findOne successfully: ${huga}`);
    })
    .catch(err => res.status(500).send(err));
});

// Create new huga document
router.post('/', (req, res) => {
  console.log(req.headers)
  console.log(req.body)
  if (req.headers.authorization == "Token "+token){
    console.log("#####Successed#####")
    console.log(req.body.text)
    console.log(`statusCode: ${res.statusCode}`)

    value=req.body.text.split(" ");

    let data = {
       huga : value[0],
       name : req.body.user_name,
       hugadate : value[1]
       //  Huga.published_date = new Date(req.body.published_date);
    }
    console.log(data);

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write('{"text":"Registered :palm_tree: '+value[0]+' '+value[1]+'"}');
    Huga.create(data)
        .then(huga => {
	   console.log(huga)
           res.send(huga)
	})
        .catch(err => res.status(500).send(err));
    res.end();
  }else{
    console.log("Wrong Token!!!!!")
  }
  
});

// Update by hugadate
router.put('/hugadate/:hugadate', (req, res) => {
  Huga.updateByHugadate(req.params.hugadate, req.body)
    .then(huga => res.send(huga))
    .catch(err => res.status(500).send(err));
});

// Delete by hugadate
router.delete('/hugadate/:hugadate', (req, res) => {
  Huga.deleteByHugadate(req.params.hugadate)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

module.exports = router;
