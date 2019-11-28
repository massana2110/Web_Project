const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../models/User');
const Reservation = require('../models/Reservation');
const Room = require('../models/Room');

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated() && req.user.name === 'superAdmin') {
        return next();
    } else {
        res.redirect('/');
    }
    res.redirect('/users/login');
};
/**
 * Get Admin Page
 */
router.get('/admin',isAuthenticated, async (req, res) =>{
    const users = await User.countDocuments({});
    const reservations = await Reservation.countDocuments({});
    const rooms = await Room.find().countDocuments({});
    res.render('admin', {title: 'Administracion', users, reservations, rooms});
})

/*GET home page */
router.get('/admin/instalaciones', isAuthenticated, (req,res,next) =>{
    res.render('installations/add_installation', { title: 'Instalaciones' });
})

router.post('/admin/instalaciones', async (req, res, next) => {
    const { typeRoom, correlative, cost } = req.body;

    const newRoom = new Room({typeRoom, correlative, cost});
    await newRoom.save();
    req.flash('success_msg', 'Habitacion añadida exitosamente');
    res.redirect('/admin');
})

router.get('/admin/instalaciones/all_rooms', isAuthenticated, async (req, res) =>{
    const rooms = await Room.find({});
    res.render('installations/all_installations', {title: 'Habitaciones', rooms});
})
/**
 * Modify Rooms
 */
router.get('/admin/instalaciones/modify/:id', async (req, res)=> {
    const room = await Room.findById(req.params.id);
    res.render('installations/edit_installation', {title: 'Modificar habitacion', room});
});

router.put('/admin/instalaciones/modify/:id', async (req, res)=> {
    console.log(req.body);
    const { typeRoom, cost, isAvailable } = req.body;
    let newDisp = !isAvailable;
    await Room.findByIdAndUpdate(req.params.id, {typeRoom, cost, newDisp});
    req.flash('success_msg', 'Habitacion modificada satisfactoriamente')
    res.redirect('/admin/instalaciones/all_rooms');
})
/**
 * Delete Room
 */
router.delete('/admin/instalaciones/delete/:id', isAuthenticated, async(req, res) => {
    await Room.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Habitacion eliminada satisfactoriamente');
    res.redirect('/admin/instalaciones/all_rooms');
})

module.exports = router;