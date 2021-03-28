import { AbstractRoute } from '../AbstractRoute';
import { App } from '../../App';
import { Google } from '../../models/Google.model';
import { Request, Response } from 'express';
import { User } from '../../models/User.model';

export class UpdateRoute extends AbstractRoute {
    async post(req: Request, res: Response, next: any) {
        if (req.body.game == null) return next();

        const token = AbstractRoute.getToken(req);
        if (token == null) return next();

        const gaia = await Google.GET_ID(token as string);
        if (gaia != null) {
            await User.CreateOrUpdate(gaia, req.body.game);
            next();
        }
        next();
    }
}
