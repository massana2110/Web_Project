const express = require('express');
const router = express.Router();

/*GET home page */
router.get('/', (req,res,next) =>{
    res.render('add_reservation', { title: 'Reservacion' });
})

module.exports = router;