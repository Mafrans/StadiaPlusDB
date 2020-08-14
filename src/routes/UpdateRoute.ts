import { IRoute } from "./IRoute";
import { App } from "../App";


export class UpdateRoute implements IRoute {
    async post(req: any, res: any, next: any) {
        if(req.body.data == null) return;
        if(req.body.token == null) return;
        
        const gaia = await App.self.database.auth.getLogin(req.body.token);
        if(gaia != null) {
            App.self.database.games.addData(gaia, req.body.data);
        }
    }
}