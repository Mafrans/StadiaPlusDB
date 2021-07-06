import {AchievementsRequest} from "../../model";
import {NextFunction, Response} from "express";
import {prisma} from "../../../index";

export async function apiAchievementsCount(req: AchievementsRequest, res: Response, next: NextFunction) {
    const {name, tag} = req.params;
    const {game} = req.query;

    const userFilter = {
        user: {
            searchNames: {
                has: `${name}#${tag}`.toLowerCase()
            }
        }
    };

    const gameFilter = game ? {
        game: {
            gameId: game
        }
    } : null

    const count = await prisma.achievement.count({
        where: {
            ...userFilter,
            ...gameFilter
        }
    });

    res.send(count.toString());
}