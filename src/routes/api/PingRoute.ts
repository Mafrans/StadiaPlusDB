import { RouteInterface } from "../Route.interface";


export class PingRoute implements RouteInterface {
    get(req: any, res: any, next: any) {
        res.send('connected!');
    }
}