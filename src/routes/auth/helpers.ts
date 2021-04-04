import {Request} from "express";
import passport from "passport";
import {OAuthStrategy as GoogleStrategy} from "passport-google-oauth";

export function getToken(req: Request) {
    const header = req.headers.authorization;
    return header && header.substring('Bearer '.length);
}

export function useGoogleOAuth() {
    passport.use(new GoogleStrategy({
        consumerKey: process.env.GOOGLE_CLIENT_ID,
        consumerSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    }, () => console.log /* TODO: Create session here */));

    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));
}