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
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const phoneRegexp = /^\d{4}-\d{4}$/;
    if(phoneRegexp.test(phone) != true){
        errors.push({text: "Nùmero de telefono incorrecto."})
    }
    if(emailRegexp.test(email)!= true){
        errors.push({text: "Correo electronico incorrecto."})
    }
    if(departure_date <= arrive_date){
        errors.push({text: 'La fecha de salida no puede ser menor o igual a la fecha de llegada.'})
    }
    if(errors.length > 0){
        res.render('add_reservation', {errors, phone, email, arrive_date,
             departure_date})
    }else{
        const newReservation = new Reservation({firstname, lastname, phone, email,
        arrive_date,departure_date,room,package});
        await newReservation.save();
        res.send('recibido');
    }
})

module.exports = router;