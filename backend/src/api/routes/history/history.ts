import {AchievementsRequest, HistoryRequest, ProfileRequest} from "../../model";
import {NextFunction, Response} from "express";
import User from "../../../database/models/User";
import Achievement from "../../../database/models/Achievement";
import Game from "../../../database/models/Game";
import {Types} from "mongoose";
import HistoryEntry from "../../../database/models/HistoryEntry";

export async function apiHistory(req: HistoryRequest, res: Response, next: NextFunction) {
    const {name, tag} = req.params;
    const start = parseInt(req.query.start) || 0;
    const count = parseInt(req.query.count) || 10;

    try {
        const user = await User.findOne({ searchNames: `${name}#${tag}`.toLowerCase() });
        const query = HistoryEntry.aggregate();
        query.match({ user: user._id });
        query.sort({ timestamp: 'desc' });
        query.skip(start);
        query.limit(count);

        const entries = await query.exec();
        console.log({entries})
        const populated = await HistoryEntry.populate(entries, [{path: 'game'}, {path: 'achievements'}]);

        res.send(populated);
    }
    catch (e) {
        return res.status(400).end();
    }
}