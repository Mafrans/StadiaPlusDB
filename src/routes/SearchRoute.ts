import { AbstractRoute } from "./AbstractRoute";
import { User } from "../models/User.model";


export class SearchRoute extends AbstractRoute {
    async get(req: any, res: any, next: any) {
        const query = decodeURI(req.query.q);
        
        let results = null;
        if(query != null) {
            results = await User.Query(query, 24);
        }

        res.render('search', { 
            results: results.map(e => ({ username: e.username, avatar: e.avatar, tag: e.tag })),
            query,
            resultCount: results.length
        });
    }
}