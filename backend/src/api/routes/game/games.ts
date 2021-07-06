import {GamesRequest} from "../../model";
import {NextFunction, Response} from "express";
import {prisma} from "../../../index";

export async function apiGames(req: GamesRequest, res: Response, next: NextFunction) {
    const {name, tag} = req.params;

    try {
        const games = await prisma.game.findMany({
            where: {
                user: {
                    searchNames: {
                        has: `${name}#${tag}`.toLowerCase()
                    }
                }
            }
        });

        res.send(games);
    }
    catch (e) {
        return res.status(400).end();
    }
}