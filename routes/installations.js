const express = require('express');
const router = express.Router();

/*GET home page */
router.get('/instalaciones', (req,res,next) =>{
    res.render('index', { title: 'Instalaciones' });
})

module.exports = router;