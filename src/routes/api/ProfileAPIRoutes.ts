import { User } from "../../models/User.model";
import { RouteInterface } from "../Route.interface";

export namespace ProfileAPIRoutes {
    export class ProfileRoute implements RouteInterface {
        async get(req: any, res: any, next: any) {
            const user = await User.FindByUsernameAndTag(
                req.params.username,
                req.params.tag
            );
    
            let APIUser = null; 
    
            if(user != null) {
                APIUser = {
                    games: user.games,
                    username: user.username,
                    tag: user.tag,
                    searchlabel: user.searchlabel,
                    avatar: user.avatar
                };
            }
    
            res.send(APIUser);
        }
    }

    export class ProfilesRoute implements RouteInterface {
        async get(req: any, res: any, next: any) {
            const profiles: User[] = await User.All();
            res.send(profiles.map(e => ({username: e.username, tag: e.tag})));
        }
    }
}
