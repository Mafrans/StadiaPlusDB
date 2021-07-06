import {AchievementsRequest} from "../../model";
import {NextFunction, Response} from "express";
import {prisma} from "../../../index";

export async function apiAchievements(req: AchievementsRequest, res: Response, next: NextFunction) {
    const {name, tag} = req.params;
    const game = req.query.game;
    const start = parseInt(req.query.start) || 0;
    const count = parseInt(req.query.count) || 10;

    try {
        const achievements = prisma.achievement.findMany({
            where: {
                user: {
                    searchNames: {
                        has: `${name}#${tag}`.toLowerCase()
                    }
                }
            },
            skip: start,
            take: count
        })
        res.send(achievements);
    }
    catch (e) {
        return res.status(400).end();
    }
}