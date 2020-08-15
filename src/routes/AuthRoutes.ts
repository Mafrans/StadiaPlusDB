import { RouteInterface } from "./Route.interface";
import passport from "passport";
import { App } from "../App";

export namespace AuthRoutes {
    export class Start implements RouteInterface {
        get(req: any, res: any, next: any) {
            req.session.redirect = req.query.redirect;
            
            const authenticate = passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile'] });
            authenticate(req, res, next);
        }
    }

    export class Callback implements RouteInterface {
        get(req: any, res: any, next: any) {
            const authenticate = passport.authenticate('google', { failureRedirect: '/login' });
            authenticate(req, res, next);
        }
    }

    export class Redirect implements RouteInterface {
        get(req: any, res: any, next: any) {
            res.redirect(req.session.redirect + '#' + req.user);
        }
    }

    export class Signout implements RouteInterface {
        post(req: any, res: any, next: any) {
            if(req.body.token == null) return;
            const token: string = req.body.token;
            
            App.self.database.auth.removeSession(token);
        }
    }
}