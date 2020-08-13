import { IService } from "./IService";
import { App } from "../App";
import passport from 'passport';
import config from '../../config.json';
const crypto = require('crypto');
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

export class AuthService implements IService {
    start(app: App) {
        passport.use(
            new GoogleStrategy(
                {
                    clientId: config.clientId,
                    clientSecret: config.clientSecret,
                    callbackURL: config.callbackURL
                },
                (_accessToken: string, _refreshToken: string, profile: any, done: (err: any, token: string) => void) => {
                    const token = this.randomToken(16);
                    app.database.auth.addLogin(token, profile.id)
                        .then(() => {
                            return done(null, token);
                        });
                }
            )
        );
    }

    randomToken(length: number) {
        return crypto.randomBytes(length).toString('ascii');
    }
}