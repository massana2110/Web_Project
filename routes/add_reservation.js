const express = require('express');
const router = express.Router();

const Reservation = require('../models/Reservation');

/*GET home page */
router.get('/reservaciones', (req,res,next) =>{
    res.render('add_reservation', { title: 'Reservacion' });
})

router.post('/reservaciones/nueva-reservacion',async (req,res)=>{
    const {firstname , lastname, phone, email, arrive_date, departure_date, room, package} = req.body;
    const errors = [];
    var startDate = new Date($('#departuredate').val());
    var endDate = new Date($('#arrivaldate').val());
    if(endDate <= startDate){
        errors.push({text: 'La fecha de salida no puede ser menor a la de arribo'})
    }
    if(errors.length > 0){
        res.render('add_reservation', {errors, arrive_date, departure_date})
    }else{
        const newReservation = new Reservation({firstname, lastname, phone, email,
        arrive_date,departure_date,room,package});
        await newReservation.save();
        res.send('Recibido')
    }
})

module.exports = router;