import {Request} from "express";
import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";

export function getToken(req: Request) {
    const header = req.headers.authorization;
    return header && header.substring('Bearer '.length);
}

export function useGoogleOAuth() {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    }, (accessToken, refreshToken, profile, done) => {
        // TODO: Verify login here
        console.log({ accessToken, refreshToken, profile });
        return done(null, "big boy")
    }));

    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));
}