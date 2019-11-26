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

module.exports = router;