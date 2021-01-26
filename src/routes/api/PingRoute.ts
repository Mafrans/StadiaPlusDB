import { RouteInterface } from "../Route.interface";
import { Request, Response } from 'express';
import { Google } from "../../models/Google.model";


export class PingRoute implements RouteInterface {
    async get(req: Request, res: Response, next: any) {
        let authenticated = false;
        if (req.query.hasOwnProperty('token') && req.query.token !== undefined && req.query.token !== null) {
            const gaia = await Google.GET_ID(req.query.token.toString());
    
            if (gaia !== null) {
                authenticated = true;
            }
        }
        res.send({ connected: true, authenticated });
    }
}