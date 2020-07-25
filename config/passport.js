const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../models/User');


function passAuth(passport) {

    passport.use(
        new LocalStrategy( {usernameField: 'email'},function(email,password,callbackDone){
            
            //match user
            User.findOne({email: email }, function(err, mongosresult){ console.log('callback' + " " + err); console.log(mongosresult); return; })
                .then(user => {
                    if (!user) {
                      return callbackDone(null, false, { message: 'That email is not registered' });
                    }

                    // Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            return callbackDone(null, user);
                        } else {
                            return callbackDone(null, false, { message: 'Password incorrect' });
                        }    
                
                });

            });
        })
    )


    passport.serializeUser(function(user, callbackDone) {
        callbackDone(null, user.id);
      });
    
    passport.deserializeUser(function(id, callbackDone) {
        User.findById(id, function(err, user) {
        callbackDone(err, user);
        });
      });
}