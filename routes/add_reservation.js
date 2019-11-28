const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const User = require('../models/User');
const Room = require('../models/Room');


function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/users/login');
};


/*GET home page */
router.get('/reservaciones', isAuthenticated, async(req,res) =>{
      await Room.find(function(err,rooms){
        res.render('add_reservation', { title: 'Reservacion' , rooms: rooms});
    })
});


router.post('/reservaciones',async (req,res,next)=>{
    const {phone, email, arrive_date, departure_date, room, package} = req.body;
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
        const newReservation = new Reservation({phone, email, arrive_date,departure_date,room,package});
        newReservation.user = req.user.id;
        await newReservation.save();
        req.flash('success_msg', '¡Reservación añadida con exito! Puede ver sus reservas en la pestaña de su perfil.')      
        res.redirect('/reservaciones');
    } 

    
})


     
module.exports = router;
