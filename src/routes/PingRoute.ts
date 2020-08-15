import { IRoute } from "./IRoute";


export class PingRoute implements IRoute {
    get(req: any, res: any, next: any) {
        res.send('connected!');
    }
}