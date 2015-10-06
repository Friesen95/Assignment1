var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get( '/contactMe',function(req, res, next) {
    
    //show the user view in the browser with the array
    res.render('contactMe', {title: 'Contact Me'});
});

module.exports = router;
