const express = require('express');
const router = express.Router();

const User = require('../models/User');

/*GET home page */
router.get('/instalaciones', (req,res,next) =>{
    res.render('index', { title: 'Instalaciones' });
})

module.exports = router;