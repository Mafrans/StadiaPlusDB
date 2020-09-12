import { Statistics } from "../../models/Statistics.model";
import { RouteInterface } from "../Route.interface";

export class StatsRoute implements RouteInterface {
    async get(req: any, res: any, next: any) {
        const stats = await Statistics.Find(
            req.params.game
        );

        res.send(stats == null ? {} : stats);
    }
}