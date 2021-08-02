import {NextFunction, Request, Response, Router} from "express";
import passport from "passport";
import {AuthRequest} from "../model";

// Route methods
export function authGoogleSignout(req: AuthRequest, res: Response, next: NextFunction) {
    req.logout();
}