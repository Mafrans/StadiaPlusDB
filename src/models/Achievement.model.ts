import { Database, IGameStats } from './../database/Database';
import { Statistics } from './Statistics.model';

export class Achievement {
    public static async Create(GameUuid: string, achievementID: string) {
        const statistics = Database.self.gameDb.statistics;
        const existing: IGameStats = await statistics.findOne({ uuid: GameUuid });

        if (existing == null) {
            const stats: Statistics = {
                uuid: GameUuid,
                owners: 1, //TODO: This seems off, shouldn't this be the logged in user?
                achievements: {
                    [achievementID]: 1
                }
            };

            // Important that we await this, because otherwise the values will be completely off
            await Statistics.Create(stats);
        }
        else {
            Statistics.Update({ uuid: GameUuid }, { $inc: { ['achievements.' + achievementID]: 1 } }); // Add one to the achivement
        }
    }
}