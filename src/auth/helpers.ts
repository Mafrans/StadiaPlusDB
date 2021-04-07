import {Express, Request} from "express";
import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import {LoginSession} from "./model";
import User from "../database/models/User";

export function getLoginSession(req: Request): LoginSession {
    const header = req.headers.authorization;
    const token = header && header.substring('Bearer '.length);
    return token && jwt.verify(token, process.env.JWT_SECRET) as LoginSession;
}

export function usePassport(app: Express) {
    app.use(passport.initialize());
}

export function useGoogleOAuth() {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    }, async (accessToken, refreshToken, profile, done) => {
        // TODO: Verify login here
        let user = await User.findById(profile.id).exec();
        if (!user) {
            user = new User({
                _id: profile.id,
                createdAt: new Date(),
                names: [],
                searchNames: [],
                score: 0,
                history: [],
                games: []
            });
            void user.save();
        }

        const token = jwt.sign({ data: profile.id }, process.env.JWT_SECRET, { expiresIn: "90 days" });
        return done(null, token);
    }));

    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));
}