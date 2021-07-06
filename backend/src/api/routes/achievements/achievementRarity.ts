import {AchievementRarityRequest} from "../../model";
import {NextFunction, Response} from "express";
import {prisma} from "../../../index";

export async function apiAchievementRarity(req: AchievementRarityRequest, res: Response, next: NextFunction) {
    const {game, index} = req.params;
    console.log({game, index});

    try {

        const achievementCount = await prisma.achievement.count({
            where: {
                game: {
                    gameId: game
                },
                index: parseInt(index)
            }
        })

        const gameCount = await prisma.game.count({
            where: {
                gameId: game
            }
        })
        res.send((achievementCount/gameCount).toString());
    }
    catch (e) {
        console.error(e);
        return res.status(400).end();
    }
}