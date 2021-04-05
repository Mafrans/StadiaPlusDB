import {Request, Response, NextFunction} from "express";
import {getLoginSession} from "../../auth/helpers";

export function apiPing(req: Request, res: Response, next: NextFunction) {
    const login = getLoginSession(req);
    res.send({ connected: true, authorized: login != null });
}