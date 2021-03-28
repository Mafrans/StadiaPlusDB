import { AbstractRoute } from "./AbstractRoute";


export class IndexRoute extends AbstractRoute {
    get(req: any, res: any, next: any) {
        res.render('index');
    }
}