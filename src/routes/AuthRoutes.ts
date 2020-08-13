import { IRoute } from "./IRoute";
import passport from "passport";

export namespace AuthRoutes {
    export class Start implements IRoute {
        get(req: any, res: any) {
            console.log('start');
            passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile'] });
        }
    }

    export class Callback implements IRoute {
        get(req: any, res: any) {
            console.log('callback');
            passport.authenticate('google', { failureRedirect: '/login' });
        }
    }

    export class Redirect implements IRoute {
        get(req: any, res: any) {
            console.log("redirect", req);
            res.redirect(req.session.redirect + '#' + req.token);
        }
    }
}