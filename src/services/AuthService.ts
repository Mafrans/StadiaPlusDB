import { IService } from "./IService";
import { App } from "../App";
import passport from 'passport';
import crypto from 'crypto';
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

export class AuthService implements IService {
    start(app: App) {
        passport.use(
            new GoogleStrategy(
                {
                    clientId: '',
                    clientSecret: '',
                    callbackURL: ''
                },
                (accessToken, refreshToken, profile, done) => {
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