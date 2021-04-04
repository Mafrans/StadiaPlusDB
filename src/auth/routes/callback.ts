import {NextFunction, Response} from "express";
import passport from "passport";
import {AuthRequest} from "../model";

export function authCallback(req: AuthRequest, res: Response, next: NextFunction) {
    const authenticate = passport.authenticate('google', {
        failureRedirect: '/login'
    });
    authenticate(req, res, next);
}

export function authRedirect(req: AuthRequest, res: Response, next: NextFunction) {
    console.log({ user: req.user })
    res.redirect(`${req.session.redirect}#${req.user}`);
}