import {NextFunction, Response} from "express";
import {PatreonRequest} from "../model";
import {parseLoginSession} from "../helpers";

// Route methods
export async function authPatreon(req: PatreonRequest, res: Response, next: NextFunction) {
    req.session.redirect = req.query.redirect;
    console.log(req.query.login)
    req.session.login = parseLoginSession(req.query.login);
    console.log(req.session.login);

    const loginUrl = new URL('https://patreon.com/oauth2/authorize');
    loginUrl.searchParams.append('response_type', 'code');
    loginUrl.searchParams.append('client_id', process.env.PATREON_CLIENT_ID);
    loginUrl.searchParams.append('redirect_uri', process.env.PATREON_CALLBACK_URL);
    loginUrl.searchParams.append('state', 'chill');

    res.redirect(loginUrl.toString() + '?login=' + req.query.login);
}