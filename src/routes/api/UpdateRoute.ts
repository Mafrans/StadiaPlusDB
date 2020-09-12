import { RouteInterface } from '../Route.interface';
import { App } from '../../App';
import { Google } from '../../models/Google.model';
import { Request, Response } from 'express';
import { User } from '../../models/User.model';

export class UpdateRoute implements RouteInterface {
    async post(req: Request, res: Response, next: any) {
        console.log(req.body.data);
        if (req.body.data == null || req.body.token == null) return;

        const gaia = await Google.GET_ID(req.body.token as string);
        if (gaia != null) {
            User.CreateOrUpdate(gaia, req.body.data);
        }
    }
}
