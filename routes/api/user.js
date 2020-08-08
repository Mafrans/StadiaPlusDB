var express = require('express');
var router = express.Router();
var User = require('../../User');

router.get('/', function (req, res) {
    console.log(req.body);
    const login = User.logins[req.query.authToken];
    console.log(login);
    
    if(login == null) {
        res.send({ error: 'Not authenticated' });
        return;
    }
    
    res.send({
        email: login._json.email,
        picture: login._json.picture,
        given_name: login._json.given_name,
        family_name: login._json.family_name,
        full_name: login._json.name
    });
});

module.exports = router;
