import { IRoute } from "./IRoute";
import { App } from "../App";

export class UserRoute implements IRoute {
    async get(req: any, res: any, next: any) {
        const gaia = await App.self.database.auth.getLogin(req.query.token);

        if(gaia == null) {
            res.send({error: 'Not authenticated'});
            return;
        }

        const user = await App.self.database.games.getUser(gaia);
        res.send(user);
    }
}