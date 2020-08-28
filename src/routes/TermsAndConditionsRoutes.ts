import { RouteInterface } from "./Route.interface";


export namespace TermsAndConditionsRoutes {
    export class MainRoute implements RouteInterface {
        get(req: any, res: any, next: any) {
            res.render('terms-and-conditions')
        }
    }

    export class TLDRRoute implements RouteInterface {
        get(req: any, res: any, next: any) {
            res.render('terms-and-conditions-tldr')
        }
    }
}