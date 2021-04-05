import {Express, Request} from "express";
import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import jwt from "jsonwebtoken";

export function getToken(req: Request) {
    const header = req.headers.authorization;
    return header && header.substring('Bearer '.length);
}

export function usePassport(app: Express) {
    app.use(passport.initialize());
}

export function useGoogleOAuth() {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    }, (accessToken, refreshToken, profile, done) => {
        // TODO: Verify login here
        const token = jwt.sign({ data: profile.id }, process.env.JWT_SECRET, { expiresIn: "90 days" });
        return done(null, token);
    }));

    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));
}