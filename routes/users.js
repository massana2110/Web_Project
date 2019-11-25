const express = require('express');
const router = express.Router();
const passport = require('passport');

//Models
const User = require('../models/User');

/*GET login page */
router.get('/users/login', (req, res) => {
    res.render('login', { title: 'Iniciar sesion' });
})

router.post('/users/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
}));
/**
 * Get Sign up page
 */
router.get('/users/signup', (req, res) => {
    res.render('signup', { title: 'Registro' });
});

router.post('/users/signup', async (req, res) => {
    const { name, lastname, age, phone, email, password, verify } = req.body;
    let errors = [];
    if (password != verify) {
        errors.push({ text: 'Contraseñas no coinciden ' })
    }
    if (password.length < 8) {
        errors.push({ text: 'Contraseña debe contener al menos 8 caracteres ' });
    }
    if (errors.length > 0) {
        console.log(errors);
        res.render('signup', { title: 'Registro', errors, name, lastname, age, phone })
    } else {
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            req.flash('error_msg', 'Este correo ya esta en uso');
            res.redirect('/users/signup');
        } else {
            //Guardando el usuario
            const newUser = new User({ name, lastname, age, phone, email, password });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'Usuario registrado satisfactoriamente');
            res.redirect('/users/login');
        }
    }
})

//LOGOUT
router.get('/logout', (req,res,next) =>{
    req.logout();
    res.redirect('/');
})

/**
 * Get profile page
 */
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/users/login');
};

router.get('/perfil', isAuthenticated, (req, res) => {
    res.render('profile', { title: 'Perfil' });
});

/**
 * Get Admin Page
 */
router.get('/admin', isAuthenticated, (req, res) =>{
    res.render('admin', {title: 'Administracion'});
})

module.exports = router;