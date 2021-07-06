import {HistoryRequest} from "../../model";
import {NextFunction, Response} from "express";
import {prisma} from "../../../index";

export async function apiHistory(req: HistoryRequest, res: Response, next: NextFunction) {
    const {name, tag} = req.params;
    const start = parseInt(req.query.start) || 0;
    const count = parseInt(req.query.count) || 10;

    try {
        const history = await prisma.history.findMany({
            where: {
                user: {
                    searchNames: {
                        has: `${name}#${tag}`.toLowerCase()
                    }
                }
            },
            include: {
                game: true,
                achievements: true
            },
            orderBy: {
                createdAt: 'desc'
            },
            skip: start,
            take: count,
        })

        res.send(history);
    }
    catch (e) {
        return res.status(400).end();
    }
}