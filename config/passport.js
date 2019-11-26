const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new localStrategy({
    usernameField: 'email',
    passReqToCallback: true
},async(req, email, password, done) =>{
    const user = await User.findOne({email: email});
    if(!user){
        return done(null, false, req.flash('error_msg', 'Datos del usuario no coinciden'));
    }else {
        const match = await user.matchPassword(password);
        if(match){
            return done(null, user);
        }else{
            return done(null, false, req.flash('error_msg', 'Datos del ususario no coinciden'));
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id); 
    done(null, user);
});