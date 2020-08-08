var express = require('express');
var router = express.Router();
var User = require('../../User');

router.post('/', function (req, res) {
    const login = User.logins[req.body.authToken];
    User.setLFG(login, req.body.game, console.log);
    res.send('POST request to the LFG page');
});

router.get('/:game', function (req, res) {
    User.getLFGUsers(req.params.game, (users) => {
        res.send(users.map(e => e.email));
    });
})

module.exports = router;
