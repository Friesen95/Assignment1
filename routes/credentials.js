var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get( '/credentials',function(req, res, next) {
    
    //show the user view in the browser with the array
    res.render('credentials', {title: 'Credentials'});
});

module.exports = router;
