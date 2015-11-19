/* FileName: Routes 
    Name: Alex Friesen 
    Website name: http://myportfolio-alexf.azurewebsites.net/
    Description: The routes file is responsible to bring up the proper view that the user wants */
var express = require('express');
var passport = require('passport');
var router = express.Router();
var User = require('../models/user');

function requireAuth(req, res, next){

  // check if already logged in
  if(!req.isAuthenticated()){
    res.redirect('/login');
  }
  next();
}

/* GET home page. */
router.get('/', function(req, res, next) {
   res.render('index', {title: 'Home'});
});

/* GET About Me Page */
router.get('/aboutMe',function(req, res, next) {
    
    //show the about Me view in the browser
    res.render('aboutMe', {title: 'About Me'});
});

/*Get Services Page*/
router.get('/services',function(req,res,next){
    //show services view in browser
    res.render('services',{title: 'Services'});
});

/*Get Projects Page*/
router.get('/projects',function(req,res,next){
    //show projecrs view in browser
    res.render('projects',{title: 'Projects'});
});

/* GET contact Me page. */
router.get( '/contactMe',function(req, res, next) {
    
    //show the contact page
    res.render('contactMe', {title: 'Contact Me'});
});

/* GET credentials/resume page. */
router.get( '/credentials',function(req, res, next) {
    
    //show the resume/cerificates page
    res.render('credentials', {title: 'Credentials'});
});

/*Login page. */
router.get('/login', function (req, res, next) {
    if (!req.user) {
        res.render('login', {
            title: 'Login',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/users');
    }
});

/*Login Request */
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/users',
    failureRedirect: '/login',
    failureFlash: true
}));

/*users page. */
router.get('/users', requireAuth, function (req, res, next) {
    User.find(function (err, users) 
    {
        if (err) 
        {
            console.log(err);
            res.end(err);
        }
        else 
        {
            res.render('users/index', 
            {
                title: 'Users',
                users: users,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
});

/*Registration Page */
router.get('/register', function (req, res, next) {
    if (!req.user) {
        res.render('register', {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/');
    }
});

router.post('/register', passport.authenticate('local-registration', {
    successRedirect : '/users',
    failureRedirect : '/register',
    failureFlash : true
}));

router.get('/logout', function (req, res){
  req.logout();
  res.redirect('/');
});

/* Add Users */
router.get('/add', requireAuth, function (req, res, next) {
    res.render('users/add', {
        title: 'Users',
        displayName: req.user ? req.user.displayName : ''
    });
});

/* submission of new user */
router.post('/add', requireAuth, function (req, res, next) {
    var user = new User(req.body);
    var hashedPassword = user.generateHash(user.password);
    User.create({
        email: req.body.email,
        password: hashedPassword,
        displayName: req.body.displayName,
    }, function (err, User) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/users');
        }
    });
});

/* Edit Page */
router.get('/:id', requireAuth, function (req, res, next) {
    var id = req.params.id;
    User.findById(id, function (err, user) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else 
        {
            res.render('users/edit', 
            {
                title: 'Users',
                user: user,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
});
/*Edit Function */
router.post('/:id', requireAuth, function (req, res, next) 
{
    var id = req.params.id;
    var user = new User(req.body);
    user.password = user.generateHash(user.password);
    user._id = id;
    User.update({ _id: id }, user, function (err) 
    {
        if (err) 
        {
            console.log(err);
            res.end(err);
        }
        else 
        {
            res.redirect('/users');
        }
    });
});

/*delete function*/
router.get('/delete/:id', requireAuth, function (req, res, next) {
    var id = req.params.id;
    User.remove({ _id: id }, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/users');
        }
    });
});

module.exports = router;
