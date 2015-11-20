/* FileName: Routes 
    Name: Alex Friesen 
    Website name: http://myportfolio-alexf.azurewebsites.net/
    Description: The routes file is responsible to bring up the proper view that the user wants */
var express = require('express');
var passport = require('passport');
var router = express.Router();
var User = require('../models/user');
var Contacts = require('../models/contacts');

function requireAuth(req, res, next) {

    // check if already logged in
    if (!req.isAuthenticated()) {
        res.redirect('/login');
    }
    next();
}

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Home' });
});

/* GET About Me Page */
router.get('/aboutMe', function (req, res, next) {
    
    //show the about Me view in the browser
    res.render('aboutMe', { title: 'About Me' });
});

/*Get Services Page*/
router.get('/services', function (req, res, next) {
    //show services view in browser
    res.render('services', { title: 'Services' });
});

/*Get Projects Page*/
router.get('/projects', function (req, res, next) {
    //show projecrs view in browser
    res.render('projects', { title: 'Projects' });
});

/* GET contact Me page. */
router.get('/contactMe', function (req, res, next) {
    
    //show the contact page
    res.render('contactMe', { title: 'Contact Me' });
});

/* GET credentials/resume page. */
router.get('/credentials', function (req, res, next) {
    
    //show the resume/cerificates page
    res.render('credentials', { title: 'Credentials' });
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

/*Login valid */
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/users',
    failureRedirect: '/login',
    failureFlash: true
}));

/*getting all the acounts page. */
router.get('/users', requireAuth, function (req, res, next) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('users/index',
                {
                    title: 'Users',
                    users: users,
                    displayName: req.user ? req.user.displayName : ''
                });
        }
    });
});

/*Registration Page for account */
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

/*mutator for creating account*/
router.post('/register', passport.authenticate('local-registration', {
    successRedirect: '/users',
    failureRedirect: '/register',
    failureFlash: true
}));

/*Logout from the current account*/
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

/* Add account */
router.get('/add', requireAuth, function (req, res, next) {
    res.render('users/add', {
        title: 'Users',
        displayName: req.user ? req.user.displayName : ''
    });
});

/* submission of new account */
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

/* Edit account page accessor */
router.get('/:id', requireAuth, function (req, res, next) {
    var id = req.params.id;
    User.findById(id, function (err, user) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('users/edit',
                {
                    title: 'Users',
                    user: user,
                    displayName: req.user ? req.user.displayName : ''
                });
        }
    });
});
/*Edit Function for account mutator */
router.post('/:id', requireAuth, function (req, res, next) {
    var id = req.params.id;
    var user = new User(req.body);
    user.password = user.generateHash(user.password);
    user._id = id;
    User.update({ _id: id }, user, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/users');
        }
    });
});

/*delete function for account */
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

/*Getting all the business contacts*/
router.get('/businessContacts', requireAuth, function (req, res, next) {
    Contacts.find(function (err, contacts) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('businessContacts/index', {
                title: 'Business Contacts',
                contacts: contacts,
                displayName: req.user ? req.user.displaName : ''
            });
        }
    });
});

/*Add business account accessor */
router.get('/add', requireAuth, function(req, res, next) {
    res.render('businessContacts/add', {
        title:'Contacts',
        displayName: req.user ? req.user.displaName : ''
    });
});

/*validating submitted business contact*/
router.post('/add', requireAuth, function(req, res, next){
    Contacts.creater({
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone,
        businessName: req.body.businessName,
        jobPossibilities: req.body.jobPossibilities
    }, function(err, contacts){
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            res.redirect('/businessContacts');
        }
    });
});

/*Edit Business Contact Accessor */
router.get('/:id', requireAuth, function (req, res, next){
    var id = req.params.id;
    Contacts.findById(id, function (err, contacts){
        if (err){
            console.log(err);
            res.end(err);
        }
        else{
            res.render('businessContacts/edit',
            {
                title: 'Business Contact',
                contacts: contacts,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
});

/*Edit Function for business contacts Mutator */
router.post('/:id', requireAuth, function (req, res, next){
    var id = req.params.id;
    var contacts = new Contacts(req.body);
    contacts._id = id;
    contacts.update({ _id: id }, contacts, function(err){
        if(err){
            console.log(err)
            res.end(err);
        }
        else{
            res.redirect('/businessContacts');
        }
    });
});

/*Deleting a contact function*/
router.get('/delete.:id', requireAuth, function(req, res, next){
    var id = req.params.id;
    Contacts.remove({_id: id}, function(err){
        if (err) {
            console.log(err);
            res.end(err);
        }
        else{
            res.direct('/businessContact');
        }
    });
});
module.exports = router;