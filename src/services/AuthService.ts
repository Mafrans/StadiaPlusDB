import { IService } from "./IService";
import { App } from "../App";
import passport from 'passport';
import config from '../../config.json';
const crypto = require('crypto');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

export class AuthService implements IService {
    start(app: App) {
        passport.use(
            new GoogleStrategy(
                {
                    clientID: config.clientId,
                    clientSecret: config.clientSecret,
                    callbackURL: config.callbackURL
                },
                (_accessToken: string, _refreshToken: string, profile: any, done: (err: any, token: string) => void) => {
                    const token = this.randomToken(32);
                    app.database.auth.addSession(token, profile.id)
                        .then(() => {
                            return done(null, token);
                        });
                }
            )
        );

        passport.serializeUser(function (user, done) {
            console.log('serializing user')
            done(null, user);
        });
    }

    randomToken(length: number) {
        return crypto.randomBytes(length/2).toString('hex');
    }
}