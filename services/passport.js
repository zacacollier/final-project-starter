const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/UserModel');
const LocalStrategy = require('passport-local');

const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const signinStrategy = new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }).exec()
        .then(user => {
            if (!user) {
                return done(null, false)
            }

        bcrypt.compare(password, user.password, function(err, isMatch) {
            if (err) {
                return done(err, false)
            }

            if (!isMatch) {
                return done(null, false)
            }

            return done(null, user)
        })
        .catch(err => done(err, false))
    })
})

const jwtOptions = {
    secretOrKey: process.env.SECRET,
    jwtFromRequest: ExtractJwt.fromHeader('authorization')
}

const authStrategy = new JwtStrategy(jwtOptions, function(payload, done) {
    User.findById(payload.userId, function(err, user) {
        if (err) {
            return done(err, false)
        }
        if (user) {
            done(null, user)
        }
        else {
            done(null, false)
        }
    })
})

passport.use('authStrategy', authStrategy)
passport.use('signinStrategy', signinStrategy)
