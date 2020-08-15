
import { App } from '../App';
import { Database, IGame } from '../database/Database';
import { IGameData } from '../database/IGameData';
import { Game } from './Game.model';
import { Achievement } from './Achievement.model';

export class User {
    gaia: string;
    games: {[uuid: string]: Game};
    username: string;
    tag: string;
    avatar: string;

    public static async Find(gaia: string): Promise<User> {
        return Database.self.gameDb.users.findOne({ gaia: gaia });
    }

    public static async FindByUsernameAndTag(username: string, tag: string): Promise<User> {
        return Database.self.gameDb.users.findOne({ username, tag });
    }

    public static async CreateOrUpdate(gaia: string, user: IGameData) {
        const gameDb = Database.self.gameDb;
        const existing: User = await gameDb.users.findOne({ gaia: gaia });

        const game = {
            uuid: user.game.uuid,
            name: user.game.name,
            achievements: user.achievements,
            time: user.time
        }

        if (existing != null) {
            gameDb.users.update({ 'gaia': gaia }, 
                { 
                    $set: { 
                        ['games.' + user.game.uuid]: game 
                    } 
                });

            if (!Object.keys(existing.games).includes(game.uuid)) {
                await Game.Create(game.uuid);
            }
            else {
                for (const achievement of game.achievements) {
                    const achievementID = achievement.icon.substring("https://lh3.googleusercontent.com/".length);
                    if (existing.games[game.uuid].achievements.find(e => e.icon === achievement.icon) == null) {
                        await Achievement.Create(game.uuid, achievementID);
                    }
                }
            }
        }
        else {
            User.Create({gaia, ...user});
            
            await Game.Create(game.uuid);

            for (const achievement of game.achievements) {
                await Achievement.Create(game.uuid, achievement.id);
            }
        }
    }
    
    public static async Create(user: IGameData) {
        await Database.self.gameDb.users.insertOne({
            gaia: user.gaia,
            games: { 
                [user.game.uuid]: {
                    uuid: user.game.uuid,
                    name: user.game.name,
                    achievements: user.achievements,
                    time: user.time
                } 
            },
            username: user.user.name,
            tag: user.user.tag,
            avatar: user.user.avatar
        });
        
    }
}