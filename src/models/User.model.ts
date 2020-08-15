import { Database } from '../database/Database';
import { IGameData, IAchievement } from '../database/IGameData';
import { Game } from './Game.model';
import { Achievement } from './Achievement.model';
import { Statistics } from './Statistics.model';

export class User {
    gaia: string;
    games: { [uuid: string]: Game };
    username: string;
    tag: string;
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

    public static async CreateOrUpdate(gaia: string, user: IGameData) {
        const gameDb = Database.self.gameDb;
        const dbUser: User = await gameDb.users.findOne({ gaia: gaia });

        const game = {
            uuid: user.game.uuid,
            name: user.game.name,
            achievements: user.achievements,
            time: user.time,
        };

        console.log({game});

        if (dbUser != null) {
            await User.AddGame(gaia, game);

            if (!(await User.HasGame(dbUser, game.uuid))) {
                await Statistics.AddGame(game.uuid);
            }

            for (const achievement of game.achievements) {
                const newUser: User = await User.Find(dbUser.gaia);
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
        if(user.games[gameUUID] != null) {
            achievements = user.games[gameUUID].achievements;
        }

        return achievements.find((e) => e.id === achievementID) != null;
    }
    
    private static async AddGame(gaia: string, game: any) {
        await Database.self.gameDb.users.updateOne(
            { gaia: gaia },
            {
                $set: {
                    ['games.' + game.uuid]: game,
                },
            }
        );
    }

    public static async Create(user: IGameData) {
        await Database.self.gameDb.users.insertOne({
            gaia: user.gaia,
            games: {},
            username: user.user.name,
            tag: user.user.tag,
            avatar: user.user.avatar,
        });

        // Add first game
        User.AddGame(user.gaia, user.game);
    }
}
