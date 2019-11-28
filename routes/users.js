const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const async = require('async');
const crypto = require('crypto');

//Models
const User = require('../models/User');
const Reservation = require('../models/Reservation');
const Building = require('../models/Building');


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
 * Get Profile page
 */
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/users/login');
};

router.get('/perfil', isAuthenticated,async (req, res) => {
    const reservaciones= await Reservation.find({user: req.user.id}).sort({arrive_date:'asc'})
    
    .then((reservaciones) => {
      res.render('profile', { title: 'Perfil de usuario', reservaciones });
    })
    .catch(() => { res.send('Ups! Algo salio mal'); });
});

/**
 * Get Admin Page
 */
router.get('/admin', isAuthenticated, async (req, res) =>{
    const users = await User.countDocuments({});
    const reservations = await Reservation.countDocuments({});
    const buildings = await Building.find().countDocuments({})
    res.render('admin', {title: 'Administracion', users, reservations, buildings});
})

/**
 * Get forgot Page
 */

router.get('/users/forgot', (req, res) => {
    res.render('forgot', { title: 'Cambiar contraseña' });
})

router.post('/users/forgot', function(req, res, next) {
    async.waterfall([
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString('hex');
          done(err, token);
        });
      },
      function(token, done) {
        User.findOne({ email: req.body.email }, function(err, user) {
          if (!user) {
            req.flash('error_msg', 'No account with that email address exists.');
            return res.redirect('/users/forgot');
          }
  
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  
          user.save(function(err) {
            done(err, token, user);
          });
        });
      },
      function(token, user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: 'SendGrid',
          auth: {
            user: 'javier48',
            pass: 'salsa1234'
          }
        });
        var mailOptions = {
          to: user.email,
          from: 'passwordreset@demo.com',
          subject: 'Node.js Password Reset',
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/users/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          req.flash('success_msg', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
          done(err, 'done');
        });
      }
    ], function(err) {
      if (err) return next(err);
      res.redirect('/users/forgot');
    });
  });


/**
 * Get Reset Page
 */

router.get('/users/reset/:token', function(req, res) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
      if (!user) {
        req.flash('error', 'Password reset token is invalid or has expired1.');
        return res.redirect('/forgot');
      }
      res.render('reset', {token: req.params.token});
    });
  });
  
  router.post('/users/reset/:token', function(req, res) {
    async.waterfall([
      function(done) {
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
          if (!user) {
            console.log(Date.now());
            req.flash('error_msg', 'Password reset token is invalid or has expired2.');
            return res.redirect('back');
          }
          if(req.body.password === req.body.confirm) {
            user.setPassword(req.body.password, function(err) {
              user.resetPasswordToken = undefined;
              user.resetPasswordExpires = undefined;
  
              user.save(function(err) {
                req.logIn(user, function(err) {
                  done(err, user);
                });
              });
            })
          } else {
              req.flash("error_msg", "Passwords do not match.");
              return res.redirect('back');
          }
        });
      },
      function(user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: 'SendGrid', 
          auth: {
            user: 'javier48',
            pass: 'salsa1234'
          }
        });
        var mailOptions = {
          to: user.email,
          from: 'learntocodeinfo@mail.com',
          subject: 'Your password has been changed',
          text: 'Hello,\n\n' +
            'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          req.flash('success_msg', 'Success! Your password has been changed.');
          done(err);
        });
      }
    ], function(err) {
      res.redirect('/');
    });
  });

module.exports = router;