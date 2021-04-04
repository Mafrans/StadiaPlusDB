import {Request, Response, NextFunction} from "express";
import {getToken} from "../auth/helpers";

export function apiPing(req: Request, res: Response, next: NextFunction) {
    const response = { connected: true, authorized: getToken(req) != null }
    res.send(response);
}