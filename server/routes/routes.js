var express = require('express');
var router = express.Router();

router.get('/api/', async (req, res) => {
    res.json("value");
});

router.get('/api/send/', (req, res) => {
    
});

router.get('/api/obd/data', (req, res) => {

})

module.exports = router;