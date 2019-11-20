const express = require('express');
const router = express.Router();

/*GET home page */
router.get('/reservaciones', (req,res,next) =>{
    res.render('add_reservation', { title: 'Reservacion' });
})

router.post('/reservaciones/nueva-reservacion',(req,res)=>{
    console.log(req.body)
    res.send('Recibido')
})

module.exports = router;