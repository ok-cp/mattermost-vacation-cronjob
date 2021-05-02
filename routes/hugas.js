const router = require('express').Router();
const Huga = require('../models/huga');

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
  Huga.huga = req.body.huga;
  Huga.date = req.body.date;
//  Huga.published_date = new Date(req.body.published_date);

  Huga.create(req.body)
    .then(huga => res.send(huga))
    .catch(err => res.status(500).send(err));
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
