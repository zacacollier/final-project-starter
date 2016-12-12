const express = require('express');
const router = express.Router();
const jwt = require('jwt-simple');
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

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
            .then(user => res.json(user))
        })
        .catch(err => next(err))
    })
})

module.exports = router
