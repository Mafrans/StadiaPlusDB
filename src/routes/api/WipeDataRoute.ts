import { RouteInterface } from '../Route.interface';
import { App } from '../../App';
import { Google } from '../../models/Google.model';
import { Request, Response } from 'express';
import { User } from '../../models/User.model';
import { Login } from '../../models/Login.model';

export class WipeDataRoute implements RouteInterface {
    async post(req: Request, res: Response, next: any) {
        if (req.body.token == null) return;

        const gaia = await Google.GET_ID(req.body.token as string);
        if (gaia != null) {
            User.Remove(gaia);
            Login.Remove(req.body.token);
            res.send('wiped data');
        }
        res.status(404);
    }
}
