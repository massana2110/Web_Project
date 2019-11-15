const express = require('express');
const router = express.Router();

/*GET home page */
router.get('/login', (req,res) => {
    res.render('login', { title: 'Iniciar sesion' });
})

router.get('/signup', (req,res) => {
    res.render('signup', { title: 'Registro' });
})

module.exports = router;