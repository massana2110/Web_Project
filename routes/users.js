const express = require('express');
const router = express.Router();

/*GET home page */
router.get('/users', function(req,res,next){
    res.render('login', { title: 'Iniciar sesion' });
})

router.get('/users', function(req,res,next){
    res.render('signup', {title: 'Registro'});
})

module.exports = router;