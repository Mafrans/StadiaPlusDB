import { RouteInterface } from '../Route.interface';
import { App } from '../../App';
import { Google } from '../../models/Google.model';
import { Request, Response } from 'express';
import { User } from '../../models/User.model';

export class UpdateRoute implements RouteInterface {
    async post(req: Request, res: Response, next: any) {
        if (req.body.game == null || req.body.token == null) return next();

        const gaia = await Google.GET_ID(req.body.token as string);
        if (gaia != null) {
            await User.CreateOrUpdate(gaia, req.body.game);
            next();
        }
        next();
    }
}
