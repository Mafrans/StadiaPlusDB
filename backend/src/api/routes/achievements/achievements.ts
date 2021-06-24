import {AchievementsRequest, ProfileRequest} from "../../model";
import {NextFunction, Response} from "express";
import User from "../../../database/models/User";
import Achievement from "../../../database/models/Achievement";
import Game from "../../../database/models/Game";
import {Types} from "mongoose";

export async function apiAchievements(req: AchievementsRequest, res: Response, next: NextFunction) {
    const {name, tag} = req.params;
    const game = req.query.game;
    const start = parseInt(req.query.start) || 0;
    const count = parseInt(req.query.count) || 10;

    try {
        const user = await User.findOne({ searchNames: `${name}#${tag}`.toLowerCase() });
        const query = Achievement.aggregate();
        query.match({ user: user._id });
        if(game) {
            query.match({ game: Types.ObjectId.createFromHexString(game) });
        }
        query.skip(start);
        query.limit(count);

        res.send(await query);
    }
    catch (e) {
        return res.status(400).end();
    }
}