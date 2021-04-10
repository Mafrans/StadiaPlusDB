import {NextFunction, Request, Response} from "express";
import User from "../../../database/models/User";
import {ProfileRequest} from "../../model";

export async function apiProfile(req: ProfileRequest, res: Response, next: NextFunction) {
    const searchName = req.params.name.toLowerCase() + '#' + req.params.tag;
    res.send(await User.findOne({ searchNames: searchName }).exec());
}