import { RouteInterface } from './Route.interface';
import { App } from '../App';
import { Google } from '../models/Google.model';
import { Request, Response } from 'express';
import { User } from '../models/User.model';

export class UpdateRoute implements RouteInterface {
    async post(req: Request, res: Response, next: any) {
        if (req.body.data == null || req.body.token == null) return;

        const gaia = await Google.GET_ID(req.body.token as string);
        console.log({token: req.body.token, gaia});
        if (gaia != null) {
            User.CreateOrUpdate(gaia, req.body.data);
        }
    }
}
