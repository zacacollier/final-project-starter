// dotenv allows us to declare environment variables in a .env file, \
// find out more here https://github.com/motdotla/dotenv
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

// Require custom strategies
require('./services/passport.js')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/final-project-app')
  .then(() => console.log('[mongoose] Connected to MongoDB'))
  .catch(() => console.log('[mongoose] Error connecting to MongoDB'));

const app = express();

const authenticationRoutes = require('./routes/authentication');
const listRoutes = require('./routes/list');
const itemRoutes = require('./routes/item');

const authStrategy = passport.authenticate('authStrategy', { session: false });

app.use(bodyParser.json());
app.use('/api', authenticationRoutes);
app.use('/api/lists', authStrategy, listRoutes);
app.use('/api/items', authStrategy, itemRoutes);

app.use((err, req, res, next) => {
  return res.status(500).send(`Server Error: ${err}`)
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Now listening on localhost:${port}`);
});
// app.get('/api/secret', authStrategy, function(req, res, next) {
//    res.send(`Logged in as ${req.user.username}`)
// })

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});
