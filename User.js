var crypto = require("crypto");
var database = require('./Database');
const { isString, isNumber } = require("util");
const StadiaGameDB = require("./StadiaGameDB");
var Schema = database.mongoose.Schema;

var userSchema = new Schema({
    user_id: Number,
    email: String,
    achievements: Object,
    username: String,
    tag: String,
    avatar: String,
    playTime: Object,
    lfg: String
});
var UserModel = database.mongoose.model('User', userSchema);

module.exports = {
    logins: {},
    login(profile, callback) {
        if(profile.authToken != undefined && logins.hasOwnProperty(profile.authToken)) {
            callback({ code: 1, message: 'Profile is already authenticated.' }, profile);
            return;
        }

        var id = crypto.randomBytes(16).toString('hex');

        profile.authToken = id;
        this.logins[id] = profile;

        UserModel.find({ user_id: profile.id }, (err, users) => {
            console.log({ err, users });
            if(users.length === 0) {
                const newUser = new UserModel();
                newUser.user_id = profile.id;
                newUser.email = profile._json.email;
                newUser.username = 'Unknown';
                newUser.tag = '1234';
                newUser.avatar = '';
                newUser.save();
            }
        });
        callback(null, profile);
    },

    setLFG(login, game, callback) {
        console.log(login)
        UserModel.update({ user_id: login.id }, { lfg: game }, callback);
    },

    setAchievements(login, achievements, callback) {
        for(let i = 0; i < achievements.length; i++) {
            const gameData = StadiaGameDB.getGame(achievements[i].game);
            achievements[i] = {
                name: encodeHTML(achievements[i].name),
                game: encodeHTML(achievements[i].game),
                gameName: encodeHTML(gameData.name),
                description: encodeHTML(achievements[i].description),
                icon: encodeHTML(achievements[i].icon),
                value: Math.max(Math.min(parseInt(achievements[i].value), 100), 0)
            }
        }

        if(achievements.length === 0) return;
        
        if(achievements.filter(e => e.game === achievements[0].game).length != achievements.length && achievements[0].game.endsWith('rcp1')) {
            // Achievement list has been meddled with
            return;
        }

        UserModel.find({ user_id: login.id }, (err, users) => {
            console.log({ err, users });
            if(users.length !== 0) {
                const newAchievements = users[0].achievements == null ? {} : users[0].achievements;
                newAchievements[achievements[0].game] = achievements;
                UserModel.update({ user_id: login.id }, { achievements: newAchievements }, callback);
            }
        });
    },

    setUserData(login, userdata, callback) {

        const tagint = parseInt(userdata.tag);
        console.log({tagint});
        if(tagint < 0 || tagint > 9999) {
            return;
        }
        console.log("kacheega");

        const newUserdata = {
            name: userdata.name.replace(/[^A-Za-z0-9]/g, ''),
            tag: userdata.tag,
            avatar: userdata.avatar
        }
        console.log({newUserdata});

        const urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
        if(!urlRegex.test(newUserdata.avatar)) {
            newUserdata.url = 'https://www.gstatic.com/stadia/gamers/avatars/mdpi/avatar_34.png'; // Default picture
        }

        UserModel.update({ user_id: login.id }, { 
            username: newUserdata.name, 
            tag: newUserdata.tag, 
            avatar: newUserdata.avatar
        }, callback);
    },

    setPlayTime(login, game, time, callback) {
        console.log({gameIsString: isString(game) , timeIsNumber: isNumber(game)});
        if(!isString(game) || isNumber(time)) return;

        const gameData = StadiaGameDB.getGame(game);

        console.log('play time');
        UserModel.find({ user_id: login.id }, (err, users) => {
            console.log({ users });
            if(users.length !== 0) {
                const newPlayTimes = users[0].playTime == undefined ? {} : users[0].playTime;
                newPlayTimes[game] = {
                    time: parseInt(time),
                    name: gameData.name,
                    image: gameData.image
                }
                console.log({newPlayTimes});
                UserModel.update({ user_id: login.id }, { playTime: newPlayTimes }, callback);
            }
        });
    },

    getLFGUsers(game, callback) {
        UserModel.find({ lfg: game }, (err, users) => {
            callback(users);
        });
    },

    getUserData(userId, callback) {
        UserModel.find({ user_id: userId }, (err, users) => {
            callback(users);
        });
    },

    getUserData(username, tag, callback) {
        UserModel.findOne({ username, tag }, (err, users) => {
            callback(users);
        });
    }
}

function encodeHTML(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}