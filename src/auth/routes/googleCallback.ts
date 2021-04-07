import {NextFunction, Response} from "express";
import passport from "passport";
import {AuthRequest} from "../model";

export function authGoogleCallback(req: AuthRequest, res: Response, next: NextFunction) {
    const authenticate = passport.authenticate('google');
    authenticate(req, res, next);
}

export function authGoogleRedirect(req: AuthRequest, res: Response, next: NextFunction) {
    console.log({ user: req.user, redirect: req.session.redirect })
    res.redirect(`${req.session.redirect}#${req.user}`);
}