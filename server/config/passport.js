var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		done(null, user);
	});
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});
	
	passport.use('local-login', new LocalStrategy({
		passReqToCallback: true
	},
	function(req, username, password, done) 
	{
		process.nextTick(function() {
			User.findOne({
				'username':username
			}, function(err, user) {
				if(err) 
				{
					return done(err);
				}
				if(!user) 
				{
					return done(null, false, req.flash('loginMessage', 'Incorrect Username'));
				}
				if(!user.validPassword(password)) 
				{
					return done(null, false, req.flash('loginMessage', 'Incorrect Password'));
				}
				return done(null, user);
			});
		});
	}));
	//config regist local srategy
	passport.use('local-registration', new LocalStrategy({
		passReqToCallback: true
	},
	
	function(req, username, password, done) {
		process.nextTick(function() {
			if(!req.user) {
				User.findOne({'username': username},
				function(err, user) {
					if(err) 
					{
						return done(err);
					}
					if(user) 
					{
						return done(null, false, req.flash('registrationMessage', 'The username is already in use'));
					}
					else {
						var newUser = new User(req.body);
						newUser.password = newUser.generateHash(newUser.password);
						newUser.save(function(err) {
							if(err) 
							{
								throw err;
							}
							return done(null, newUser);
						});
					}
				});
			} 
			else 
			{
				return done(null, req.user);
			}
		});
	}));
	
}