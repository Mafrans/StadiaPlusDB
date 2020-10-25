import { RouteInterface } from "../Route.interface";

import { Google } from "../../models/Google.model";
import { User } from "../../models/User.model";
import { Request, Response } from 'express';
import { UserResource } from '../../resources/User.resource';

export class UserRoute implements RouteInterface {
    async get(req: Request, res: Response, next: any) {
        const gaia = await Google.GET_ID(req.query.token.toString());

        if(gaia == null) {
            res.send({error: 'Not authenticated'});
            return;
        }

        const user = await User.Find(gaia);
        if(user == null) {
            res.send({});
            return;
        }
        res.send(new UserResource(user).toString());
    }
}