const express = require('express');
const router = express.Router();

const Room = require('../models/Room');

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/users/login');
};

/*GET home page */
router.get('/instalaciones', isAuthenticated, (req,res,next) =>{
    res.render('installations/add_installation', { title: 'Instalaciones' });
})

router.post('/instalaciones', async (req, res, next) => {
    const { typeRoom, correlative, cost } = req.body;

    const newRoom = new Room({typeRoom, correlative, cost});
    await newRoom.save();
    req.flash('success_msg', 'Habitacion añadida exitosamente');
    res.redirect('/admin');
})

router.get('/instalaciones/all_rooms', isAuthenticated, async (req, res) =>{
    const rooms = await Room.find({});
    res.render('installations/all_installations', {title: 'Habitaciones', rooms});
})

router.get('instalaciones/modify/:id', async (req, res)=> {
    const room = await Room.findById(req.params.id);
    res.render('installations/edit_installation', {title: 'Modificar habitacion', room});

})

module.exports = router;