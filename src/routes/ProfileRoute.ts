import { RouteInterface } from './Route.interface';
import { App } from '../App';
import { User } from '../models/User.model';
import { Statistics } from './../models/Statistics.model';

export class ProfileRoute implements RouteInterface {
    async get(req: any, res: any, next: any) {
        const user = await User.FindByUsernameAndTag(
            req.params.username,
            req.params.tag
        );
        if (user == null) {
            res.render('error', {
                error: {
                    message: 'This profile does not exist',
                    description: `
                            Oops, it seems like you've hit a roadblock. It seems like this profile 
                            doesn't exist on our servers. Make sure to check your url, and contact 
                            Mafrans on <a href="https://discord.com/invite/2VDbEQ8">Discord</a> if 
                            you think this is an error.
                        `,
                },
            });
            return;
        }

        let games = [];
        for (const game of Object.values(user.games)) {
            const dbgame = App.self.stadiagamedb.getGame(game.uuid);
            console.log(dbgame);
            console.log({
                uuid: game.uuid,
                time: game.time,
                name: game.name,
                image: dbgame !== undefined ? dbgame.image : '',
            });

            games.push({
                uuid: game.uuid,
                time: game.time,
                name: game.name,
                image: dbgame != null ? dbgame.image : '',
            });
        }

        let achievements: any[] = [];
        for (const uuid in user.games) {
            const stats = await Statistics.Find(uuid);

            for (const achievement of user.games[uuid].achievements) {
                (achievement as any).stats = {
                    total: stats.achievements[achievement.id],
                    percent: stats.achievements[achievement.id] / stats.owners * 100,
                };

                achievements.push(achievement);
            }
        }

        games = games.sort((a, b) => b.time - a.time).slice(0, 4);
        achievements = achievements
            .sort((a, b) => a.stats.percent - b.stats.percent)
            .slice(0, 6);

        res.render('profile', {
            user: {
                username: user.username,
                avatar: user.avatar,
                tag: user.tag,
            },
            games,
            achievements,
        });
    }
}
