import { Database } from '../database/Database';
import { IGameData, IAchievement } from '../database/IGameData';
import { Game } from './Game.model';
import { Achievement } from './Achievement.model';
import { Statistics } from './Statistics.model';
import { use } from 'passport';
import { Db } from 'mongodb';

export class User {
    gaia: string;
    games: { [uuid: string]: Game };
    username: string;
    tag: string;
    searchlabel: string;
    avatar: string;

    public static async Find(gaia: string): Promise<User> {
        return Database.self.gameDb.users.findOne({ gaia: gaia });
    }

    public static async FindByUsernameAndTag(
        username: string,
        tag: string
    ): Promise<User> {
        return Database.self.gameDb.users.findOne({ username, tag });
    }

    public static async Query(query: string, limit: number): Promise<User[]> {
        let founders = await Database.self.gameDb.users.find({ searchlabel: { $regex: '.*' + query.toLowerCase() + '.*' }, tag: "0000" }).toArray();
        let nonFounders = await Database.self.gameDb.users.find({ searchlabel: { $regex: '.*' + query.toLowerCase() + '.*' }, tag: { $not: { $eq: "0000" }}}).toArray();

        founders = founders.slice(0, limit).sort((a, b) => a.username.localeCompare(b.username));
        nonFounders = nonFounders.slice(0, limit - founders.length).sort((a, b) => a.username.localeCompare(b.username));

        return founders.concat(nonFounders); // Founders first, then the rest
    }

    public static async CreateOrUpdate(gaia: string, user: IGameData) {
        const dbUser: User = await User.Find(gaia);

        const game = {
            uuid: user.game.uuid,
            name: user.game.name,
            achievements: user.achievements,
            time: user.time,
        };

        if (dbUser != null) {
            await User.AddGame(gaia, game);

            if (!(await User.HasGame(dbUser, game.uuid))) {
                await Statistics.AddGame(game.uuid);
            }

            console.log({game, ach: dbUser.games[game.uuid]});
            for (const achievement of game.achievements) {
                if (!(await User.HasAchievement(dbUser, game.uuid, achievement.id))) {
                    console.log("new!")
                    await Statistics.AddAchievement(game.uuid, achievement.id);
                }
            }
        } else {
            User.Create({ gaia, ...user });

            await Statistics.AddGame(game.uuid);

            for (const achievement of game.achievements) {
                console.log(achievement)
                await Statistics.AddAchievement(game.uuid, achievement.id);
            }
        }
    }

    private static async HasGame(user: User, gameUUID: string): Promise<boolean> {
        return Object.keys(user.games).includes(gameUUID);
    }

    private static async HasAchievement(user: User, gameUUID: string, achievementID: string): Promise<boolean> {
        let achievements: IAchievement[] = [];
        if(user.games[gameUUID] != null && user.games[gameUUID].achievements != null) {
            achievements = user.games[gameUUID].achievements;
        }

        return achievements.find((e) => e.id === achievementID) != null;
    }
    
    private static async AddGame(gaia: string, game: Game) {
        await Database.self.gameDb.users.updateOne(
            { gaia: gaia },
            {
                $set: {
                    ['games.' + game.uuid]: game,
                },
            }
        );
    }

    public static async Create(data: IGameData) {
        await Database.self.gameDb.users.insertOne({
            gaia: data.gaia,
            games: {},
            username: data.user.name,
            tag: data.user.tag,
            avatar: data.user.avatar,
            searchlabel: (data.user.name + '#' + data.user.tag).toLowerCase()
        });

        // Add first game
        User.AddGame(data.gaia, {
            uuid: data.game.uuid,
            name: data.game.name,
            achievements: data.achievements,
            time: data.time
        });
    }

    public static async Remove(gaia: string) {
        const user = await User.Find(gaia);
        for(const uuid in user.games) {
            Game.DecreaseStat(uuid);

            const game = user.games[uuid];
            for(const achievement of game.achievements) {
                Achievement.DecreaseStat(uuid, achievement.id);
            }
        }
        Database.self.gameDb.users.remove({gaia});
    }
}
