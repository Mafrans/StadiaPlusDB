import { RouteInterface } from './Route.interface';
import { App } from '../App';
import { User } from '../models/User.model';
import config from '../../config.json';

export class GamesRoute implements RouteInterface {
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
                    safetyURL: config.host
                },
            });
            return;
        }

        let games = [];
        for (const game of Object.values(user.games)) {
            const dbgame = App.self.stadiaGameDb.getGame(game.uuid);

            games.push({
                uuid: game.uuid,
                time: game.time,
                name: game.name,
                image: dbgame != null ? dbgame.image : '',
            });
        }

        games = games.sort((a, b) => b.time - a.time).slice(0, 4);

        res.render('games', {
            user: {
                username: user.username,
                avatar: user.avatar,
                tag: user.tag,
            },
            games,
        });
    }
}
