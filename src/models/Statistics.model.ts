import { Database } from '../database/Database';

export class Statistics {
    constructor(
        public uuid: string,
        public owners: number,
        public achievements: { [icon: string]: number }
    ) {}

    public static async Create(statistics: Statistics) {
        return Database.self.gameDb.statistics.insertOne(statistics);
    }

    public static async Update(uuid: { uuid: string }, payload: any) {
        return Database.self.gameDb.statistics.updateOne({ ...uuid }, payload);
    }

    public static async Find(uuid: string): Promise<Statistics> {
        return Database.self.gameDb.statistics.findOne({ uuid });
    }
}
