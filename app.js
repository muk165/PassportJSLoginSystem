const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

mongoose.connect( db, {useNewUrlParser: true, useUnifiedTopology:true})
        .then(function(){ console.log('mongoose connected')})
        .catch(err => console.log('error occured', err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');


// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  })
);


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Connect flash
app.use(flash());


// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });

app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/user.js'));
  
const PORT = process.env.PORT || 5000;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));


  