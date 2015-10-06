var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get( '/services',function(req, res, next) {
    //show the services view
    res.render({title: 'Services'});
});

module.exports = router;
