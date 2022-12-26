const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Keys = require('./key');

const User = require('../models/user');

module.exports = function(passport) {
    
    let options = {};
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    options.secretOrKey = Keys.secretOrKey;

    passport.use(new JwtStrategy( options, (jwt_payload, done) => {

        User.findById(jwt_payload.id, (error, user) => {

            if ( error ) {
                return done(error, false);
            }
            if ( user ) {
                return done(null, user);
            } 
            else {
                return done(null, false);
            }

        });

    }));

}