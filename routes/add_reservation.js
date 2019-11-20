const express = require('express');
const router = express.Router();

/*GET home page */
router.get('/reservaciones', (req,res,next) =>{
    res.render('add_reservation', { title: 'Reservacion' });
})

router.post('/reservaciones/nueva-reservacion',(req,res)=>{
    const {fisrtname , lastname, telephone, email, arrive_date, departure_date, chosen_room, chosen_package} = req.body;
    const errors = [];
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    if(departure_date <= arrive_date){
        errors.push({text: 'La fecha de salida no puede ser menor a la de arrivo'})
    }
    if(errors.length > 0){
        res.render('add_reservation', {errors, email})
    }else{
        res.send('Recibido')
    }
})

module.exports = router;