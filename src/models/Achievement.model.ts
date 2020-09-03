import { Database } from './../database/Database';
import { Statistics } from './Statistics.model';

export class Achievement {
    public static async IncrementStat(gameUuid: string, achievementID: string) {
        const statistics = Database.self.gameDb.statistics;
        const existing: Statistics = await statistics.findOne({ uuid: gameUuid });

        if (existing == null) {
            const stats: Statistics = {
                uuid: gameUuid,
                owners: 1,
                achievements: {
                    [achievementID]: 1
                }
            };

            // Important that we await this, because otherwise the values will be completely off
            await Statistics.Create(stats);
        }
        else {
            Statistics.Update({ uuid: gameUuid }, { $inc: { ['achievements.' + achievementID]: 1 } }); // Add one to the achivement
        }
    }

    public static async DecreaseStat(gameUuid: string, achievementID: string) {
        Statistics.Update({ uuid: gameUuid }, { $inc: { ['achievements.' + achievementID]: -1 } }); // Subtract one from the achivement
    }
}