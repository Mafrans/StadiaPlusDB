import {NextFunction, Response} from "express";
import {ProfileRedirectRequest} from "../../model";

export async function apiProfileRedirect(req: ProfileRedirectRequest, res: Response, next: NextFunction) {
    let [name, tag] = req.params.name.split('#');
    if(!tag) {
        tag = '0000';
    }

    res.redirect(`../${name}/${tag}`);
}