import {ParsedQs} from "qs";
import {Session} from "express-session";
import {Request} from "express";

export interface AuthQuery extends ParsedQs {
    redirect: string;
}

export interface AuthSession extends Session {
    redirect: string;
}

export interface AuthRequest extends Request {
    session: AuthSession;
    sessionID: string;
    query: AuthQuery;
    user: string;
}