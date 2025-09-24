const passport = require('passport');
const Adminmodel = require('../models/adminmodel')
const localstratergy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')

passport.use(new localstratergy({
    usernameField: 'email'
}, async (email, password, cb) => {
    let adminRec = await Adminmodel.findOne({ email: email });
    if (adminRec) {
        let matchpass = await bcrypt.compare(password, adminRec.password)
        if (matchpass) {
            cb(null, adminRec);
        }
        else {
            cb(null, false)
        }
    }
    else {
        cb(null, false)
    }
}))


passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
    let adminRec =  await Adminmodel.findById(id);
    if (adminRec) {
        cb(null, adminRec)
    }
});
passport.checkAdmin = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/");
    }
}

passport.setAuthenticateUser = (req, res, next) => {
    if (req.user) {
        res.locals.user = req.user
    }
    next();
}

module.exports = passport;