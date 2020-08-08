var express = require('express');
var router = express.Router();
var User = require('../User');

/* GET home page. */
router.get('/:username', function(req, res, next) {
    res.redirect(`/profile/${req.params.username}/0000`);
});

/* GET home page. */
router.get('/:username/:tag', function(req, res, next) {
    User.getUserData(req.params.username, req.params.tag, (user) => {
        if(user === null) {
            res.send('404 - Profile not found');
            return;
        }

        games = []
        for(let key of Object.keys(user.playTime)) {
            console.log(user.playTime[key])
            games.push({
                uuid: key,
                time: user.playTime[key].time,
                name: user.playTime[key].name,
                image: user.playTime[key].image,
            });
        }

        achievements = []
        for(let key of Object.keys(user.achievements)) {
            achievements = achievements.concat(user.achievements[key]);
        }

        games = games.sort((a, b) => b.time - a.time).slice(0, 4);
        achievements = achievements.filter(a => a.value === 100).sort((a, b) => Math.random() < 0.5 ? 1 : -1).slice(0, 6);

        res.render('profile', { user, achievements, games });
    });
});


router.get('/:username/:tag/game/:game', function(req, res, next) {
    User.getUserData(req.params.username, req.params.tag, (user) => {
        if(user === null) {
            res.send('404 - Profile not found');
            return;
        }

        const game = {
            uuid: req.params.game,
            time: user.playTime[req.params.game].time,
            name: user.playTime[req.params.game].name,
            image: user.playTime[req.params.game].image,
        }

        let achievements = user.achievements[req.params.game];
        if(achievements == null) achievements = [];

        res.render('game', { user, achievements, game });
    });
});

router.get('/:username/:tag/achievements', function(req, res, next) {
    User.getUserData(req.params.username, req.params.tag, (user) => {
        if(user === null) {
            res.send('404 - Profile not found');
            return;
        }

        achievements = []
        for(let key of Object.keys(user.achievements)) {
            achievements = achievements.concat(user.achievements[key]);
        }

        achievements = achievements.filter(e => e.value === 100);
        console.log(achievements);

        res.render('achievements', { user, achievements });
    });
});

router.get('/:username/:tag/games', function(req, res, next) {
    User.getUserData(req.params.username, req.params.tag, (user) => {
        if(user === null) {
            res.send('404 - Profile not found');
            return;
        }
        
        games = []
        for(let key of Object.keys(user.playTime)) {
            console.log(user.playTime[key])
            games.push({
                uuid: key,
                time: user.playTime[key].time,
                name: user.playTime[key].name,
                image: user.playTime[key].image,
            });
        }

        res.render('games', { user, games });
    });
});

module.exports = router;
