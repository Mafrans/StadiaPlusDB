import {NextFunction, Request, Response, Router} from "express";
import passport from "passport";
import {AuthRequest} from "./model";

// Route methods
export function authStart(req: AuthRequest, res: Response, next: NextFunction) {
    req.session.redirect = req.query.redirect;

    const authenticate = passport.authenticate('google',  {
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            "https://www.googleapis.com/auth/stadia.profile"
        ]
    });
    authenticate(req, res, next);
}