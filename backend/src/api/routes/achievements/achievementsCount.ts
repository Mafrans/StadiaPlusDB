import {AchievementsRequest, ProfileRequest} from "../../model";
import {NextFunction, Response} from "express";
import User from "../../../database/models/User";
import Achievement from "../../../database/models/Achievement";

export async function apiAchievementsCount(req: AchievementsRequest, res: Response, next: NextFunction) {
    const {name, tag} = req.params;
    const {game} = req.query;

    const user = await User.findOne({ searchNames: `${name}#${tag}`.toLowerCase() });
    let query = Achievement.countDocuments({user: user._id});

    if (game) {
        query.where({game})
    }

    res.send((await query).toString());
}