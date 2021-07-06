import {NextFunction, Request, Response} from "express";
import {getLoginSession} from "../../../auth/helpers";
import {prisma} from "../../../index";

export async function apiProfileSelf(req: Request, res: Response, next: NextFunction) {
    const login = getLoginSession(req);
    res.send(await prisma.user.findFirst({ where: { googleId: login.data }}));
}