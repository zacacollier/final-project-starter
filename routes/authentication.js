const express = require('express');
const router = express.Router();
const jwt = require('jwt-simple');
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const passport = require('passport')

require('../services/passport.js')

const signinStrategy = passport.authenticate('signinStrategy', { session: false})

function tokenForUser(user) {
    const timestamp = new Date().getTime()
    return jwt.encode({ userId: user.id, iat: timestamp }, process.env.SECRET )
}

router.post('/signin', signinStrategy, function(req, res, next) {
    res.json({ token: tokenForUser(req.user)})
})

router.post('/signup', function(req, res, next) {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(422)
        .json({error: "You must provide a valid username and password."})
    }

    User.findOne({ username }).exec()
    .then((existingUser) => {
        if (existingUser) {
            return res.status(422).json({ error: 'Username is unavailable.'})
        }

        bcrypt.hash(password, 10, function(err, hashedPassword) {
            if (err) {
                return next(err)
            }

            const user = new User({ username, password: hashedPassword })

            user.save()
            .then(user => res.json({ token: tokenForUser(user) }))
        })
        .catch(err => next(err))
    })
})

module.exports = router
