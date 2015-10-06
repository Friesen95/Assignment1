var express = require('express');
var router = express.Router();

/*Get Home Page*/
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Home'});
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

module.exports = router;
