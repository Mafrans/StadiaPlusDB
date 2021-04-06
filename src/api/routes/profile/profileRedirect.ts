import {NextFunction, Request, Response} from "express";
import {ParamsDictionary} from 'express-serve-static-core';
import {getLoginSession} from "../../../auth/helpers";
import User from "../../../database/models/User";
import {ProfileRedirectRequest} from "../../model";

export async function apiProfileRedirect(req: ProfileRedirectRequest, res: Response, next: NextFunction) {
    let [name, tag] = req.params.name.split('#');
    if(!tag) {
        tag = '0000';
    }

    res.redirect(`../${name}/${tag}`);
}