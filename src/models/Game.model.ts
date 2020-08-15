import { IGameStats, Database } from "../database/Database";
import { IAchievement } from "../database/IGameData";

export class Game {
    constructor(public uuid: string,
        public name: string,
        public achievements: IAchievement[],
        public time: number) { }

    public static async Create(uuid: string) {
        const statistics = Database.self.gameDb.statistics;
        const existing: IGameStats = await statistics.findOne({ uuid: uuid });
        if (existing == null) {
            const stats: IGameStats = {
                uuid: uuid,
                owners: 1,
                achievements: {}
            };

            // Important that we await this, because otherwise the values will be completely off
            await statistics.insertOne(stats);
        }
        else {
            statistics.update({ uuid: uuid }, { $inc: { owners: 1 } }); // Add 1 to owners
        }
    }
}