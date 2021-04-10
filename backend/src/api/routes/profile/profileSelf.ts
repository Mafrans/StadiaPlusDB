import {NextFunction, Request, Response} from "express";
import {getLoginSession} from "../../../auth/helpers";
import User from "../../../database/models/User";

export async function apiProfileSelf(req: Request, res: Response, next: NextFunction) {
    const login = getLoginSession(req);
    res.send(await User.findById(login.data).exec());
}