/* FileName: ROutes 
    Name: Alex Friesen 
    Website name: http://myportfolio-alexf.azurewebsites.net/
    Description: The routes file is responsible to bring up the proper view that the user wants */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Home'
    });
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


module.exports = router;
