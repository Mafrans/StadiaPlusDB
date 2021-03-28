import { AbstractRoute } from "../AbstractRoute";
import {Login} from "../../models/Login.model";
import {Google} from "../../models/Google.model";


export class PingRoute extends AbstractRoute {
    get(req: any, res: any, next: any) {
        console.log(req.headers);
        const response = { connected: true, authorized: AbstractRoute.getToken(req) != null };
        console.log(response);

        res.send(response);
    }
}