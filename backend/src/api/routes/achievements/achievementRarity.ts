import {AchievementRarityRequest, AchievementsRequest, ProfileRequest} from "../../model";
import {NextFunction, Response} from "express";
import User from "../../../database/models/User";
import Achievement from "../../../database/models/Achievement";
import Game from "../../../database/models/Game";
import {Types} from "mongoose";

export async function apiAchievementRarity(req: AchievementRarityRequest, res: Response, next: NextFunction) {
    const {game, index} = req.params;
    console.log({game, index});

    try {
        const achievementCount = await Achievement.where({ index })
            .populate({path: 'game', match: { id: game }, select: 'id'})
            .where({ 'game.id': game })
            .countDocuments();

        const gameCount = await Game.count().where({ id: game });
        console.log({achievementCount});

        res.send((achievementCount/gameCount).toString());
    }
    catch (e) {
        console.error(e);
        return res.status(400).end();
    }
}