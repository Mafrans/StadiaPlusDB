import { AbstractRoute } from '../AbstractRoute';
import { App } from '../../App';
import { Google } from '../../models/Google.model';
import { Request, Response } from 'express';
import { User } from '../../models/User.model';
import { Login } from '../../models/Login.model';

export class WipeDataRoute extends AbstractRoute {
    async post(req: Request, res: Response, next: any) {
        const token = AbstractRoute.getToken(req);
        if (token == null) return next();

        const gaia = await Google.GET_ID(token);
        if (gaia != null) {
            User.Remove(gaia);
            Login.Remove(token);
            res.send('wiped data');
        }
        res.status(404);
    }
}
