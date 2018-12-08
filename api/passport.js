const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const db = require('./db.js');
const opts = {};

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

module.exports = passport => {
  passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
    db.query('SELECT * FROM usuarios WHERE id = ?', [jwt_payload.id], function(err, rows) {
      let userExists = rows.length > 0;

      if (err) return done(err);
      if (userExists) {
        let user = rows[0];
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));
};