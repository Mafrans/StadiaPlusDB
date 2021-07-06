import {NextFunction, Response} from "express";
import {ProfileRequest} from "../../model";
import {prisma} from "../../../index";

export async function apiProfile(req: ProfileRequest, res: Response, next: NextFunction) {
    const searchName = req.params.name.toLowerCase() + '#' + req.params.tag;
    const user = await prisma.user.findFirst({
        where: {
            searchNames: {
                has: searchName
            }
        }
    });

    if (!user) {
        return res.status(404).end();
    }

    res.send(user);
}