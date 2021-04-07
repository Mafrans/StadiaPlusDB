import {Request, Response, NextFunction} from "express";
import {getLoginSession} from "../../auth/helpers";
import User from "../../database/models/User";

export async function apiPing(req: Request, res: Response, next: NextFunction) {
    const login = getLoginSession(req) || {data: null};
    const user = await User.findById(login.data).exec();
    res.send({connected: true, authorized: user != null});
}