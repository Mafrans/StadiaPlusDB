var express = require('express');
var router = express.Router();
var User = require('../../User');

router.post('/achievements', function (req, res) {
    if(req.body.achievements == null) return;

    const login = User.logins[req.body.authToken];
    User.setAchievements(login, req.body.achievements, console.log);
    res.send('POST request to the Achievements page');
});

router.post('/userdata', function (req, res) {
    console.log(req.body);
    if(req.body.user == null) return;

    const login = User.logins[req.body.authToken];
    User.setUserData(login, req.body.user, console.log);
    res.send('POST request to the User Data page');
});

router.post('/playtime', function (req, res) {
    console.log(req.body);
    if(req.body.game == null || req.body.time == null) return;

    const login = User.logins[req.body.authToken];
    User.setPlayTime(login, req.body.game, req.body.time, console.log);
    res.send('POST request to the Play Time page');
});

router.get('/:username/:tag', function (req, res) {
    User.getUserData(req.params.username, req.params.tag, (user) => {
        res.send({
            username: user.username,
            avatar: user.avatar,
            tag: user.tag,
            playTime: user.playTime,
            achievements: user.achievements,
        });
    });
})

module.exports = router;
