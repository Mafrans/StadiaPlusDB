import { IRoute } from "./IRoute";
import passport from "passport";

export namespace AuthRoutes {
    export class Start implements IRoute {
        get(req: any, res: any, next: any) {
            console.log('start');
            const authenticate = passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile'] });
            authenticate(req, res, next);
        }
    }

    export class Callback implements IRoute {
        get(req: any, res: any, next: any) {
            console.log('callback');
            const authenticate = passport.authenticate('google', { failureRedirect: '/login' });
            authenticate(req, res, next);
        }
    }

    export class Redirect implements IRoute {
        get(req: any, res: any, next: any) {
            console.log("redirect", req);
            res.redirect(req.session.redirect + '#' + req.token);
        }
    }
}