import {Request, Response, NextFunction} from "express";
import {getToken} from "../../auth/helpers";
import jwt from "jsonwebtoken";

export function apiPing(req: Request, res: Response, next: NextFunction) {
    const token = getToken(req);
    const decoded = token && jwt.verify(token, process.env.JWT_SECRET);

    res.send({ connected: true, authorized: decoded != null });
}