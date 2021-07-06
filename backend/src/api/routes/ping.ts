import {Request, Response, NextFunction} from "express";
import {getLoginSession} from "../../auth/helpers";
import {prisma} from "../../index";

export async function apiPing(req: Request, res: Response, next: NextFunction) {
    const login = getLoginSession(req);
    const response = {
        connected: true,
        authorized: false
    }

    if (login) {
        const user = await prisma.user.findUnique({
            where: {
                googleId: login.data
            }
        });

        response.authorized = user !== null;
    }

    res.send(response);
}