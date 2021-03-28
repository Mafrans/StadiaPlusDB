import { Statistics } from "../../models/Statistics.model";
import { AbstractRoute } from "../AbstractRoute";

export class StatsRoute extends AbstractRoute {
    async get(req: any, res: any, next: any) {
        const stats = await Statistics.Find(
            req.params.game
        );

        res.send(stats == null ? {} : stats);
    }
}