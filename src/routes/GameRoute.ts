import { RouteInterface } from './Route.interface';
import { App } from '../App';
import { User } from '../models/User.model';
import { Statistics } from '../models/Statistics.model';

export class GameRoute implements RouteInterface {
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

        const game = user.games[req.params.game];

        // Check if the game is null first
        if(game == null) {
            res.render('error', {
                error: {
                    message: `${user.username}#${user.tag} does not own this game`,
                    description: `
                            According to our servers, ${user.username} doesn't own this game.
                            If this is your profile and you do own the game, please update it 
                            by pressing the <a href="/images/UpdateInDBButton.png" target="_blank">"Update in DB" button</a> 
                            on the game. 
                        `,
                },
            });
            return;
        }

        // Then set the icon
        (game as any).icon = App.self.stadiaGameDb.getGame(game.uuid);

        let achievements: any[] = game.achievements;
        if(achievements == null) achievements = [];
        
        const stats = await Statistics.Find(game.uuid);
        for (const achievement of achievements) {
            achievement.stats = {
                total: stats.achievements[achievement.id],
                percent: stats.achievements[achievement.id] / stats.owners * 100,
            };
        }

        achievements = achievements.sort((a, b) => a.stats.percent - b.stats.percent);

        res.render('game', {
            user: {
                username: user.username,
                avatar: user.avatar,
                tag: user.tag,
            },
            game,
            achievements,
        });
    }
}