import {NextFunction, Response} from "express";
import {getLoginSession} from "../../../auth/helpers";
import User from "../../../database/models/User";
import {ProfileUpdateRequest} from "../../model";
import GameSchema, {Game} from "../../../database/models/Game";
import Achievement from "../../../database/models/Achievement";
import HistoryEntry, {generateHistoryText} from "../../../database/models/HistoryEntry";
import {Schema, Types} from "mongoose";

export async function apiProfileUpdate(req: ProfileUpdateRequest, res: Response, next: NextFunction) {
    const login = getLoginSession(req);
    if (!login || !login.data) {
        return;
    }

    const {profile, game, playTime, achievements} = req.body.data;
    console.log(game);
    let user = await User.findById(login.data).populate({ path: 'games', match: { id: game.id } }).exec();
    console.log(user);


    if (profile.name) {
        if (!user.names.includes(profile.name)) {
            user.names.unshift(profile.name);
            user.searchNames.unshift(profile.name.toLowerCase());
        }
    }

    if (profile.avatar) {
        user.avatar = profile.avatar;
    }

    if (game) {
        const historyEntry = new HistoryEntry({ timestamp: new Date(), type: 'progress' });
        let dbGame: Game;

        if (user.games.length === 0) {
            console.log('new game!');
            dbGame = new GameSchema(game);
            dbGame.playTime = playTime || 0;

            user.depopulate('games');
            user.games.push(dbGame['_id']);

            historyEntry.game = dbGame['_id'];

            for (let i = 0; i < achievements.length; i++) {
                const a = achievements[i];
                const schema = new Achievement({
                    index: a.id,
                    timestamp: historyEntry.timestamp,
                    name: a.name,
                    description: a.description,
                    imageURL: a.icon,
                    game: dbGame['_id'],
                    user: user['_id']
                });
                void schema.save();

                if (i < 6) {
                    historyEntry.achievements.push(schema['_id']);
                }
            }
            historyEntry.playTime = playTime;
        }
        else {
            dbGame = user.games[0] as unknown as Game;
            const deltaTime = playTime - dbGame.playTime;
            const achievements = await Achievement.find({ game: dbGame['_id'] }).exec();

            if (historyEntry.achievements.length < achievements.length) {
                historyEntry.achievements = achievements.filter(a =>
                        achievements.filter(b => a.id === b.id).length === 0
                    )
                    .slice(0, 6)
                    .map(a => a['_id']);
            }

            dbGame.playTime = playTime;
            dbGame.name = game.name;

            historyEntry.game = dbGame['_id'];
            historyEntry.playTime = deltaTime;
        }

        if(historyEntry.playTime > 0 || historyEntry.achievements.length > 0) {
            void historyEntry.save();
            user.history.push(historyEntry['_id']);
        }

        void user.save();
        void dbGame.save();

        return res.status(200).end();
    }
    return res.status(500).end();
}