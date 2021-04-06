import {Request} from "express";
import {ParamsDictionary} from "express-serve-static-core";

export interface ProfileRequest extends Request {
    params: ProfileParams
}

export interface ProfileParams extends ParamsDictionary {
    name: string
    tag: string
}

export interface ProfileRedirectRequest extends Request {
    params: ProfileRedirectParams
}

export interface ProfileRedirectParams extends ParamsDictionary {
    name: string
}