import { RouteInterface } from "./Route.interface";


export class IndexRoute implements RouteInterface {
    get(req: any, res: any, next: any) {
        res.render('index');
    }
}