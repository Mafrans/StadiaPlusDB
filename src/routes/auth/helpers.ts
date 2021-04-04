import {Request} from "express";

export function getToken(req: Request) {
    const header = req.headers.authorization;
    return header && header.substring('Bearer '.length);
}