import { RouteInterface } from "./Route.interface";


export namespace PrivacyPolicyRoutes {
    export class MainRoute implements RouteInterface {
        get(req: any, res: any, next: any) {
            res.render('privacy-policy')
        }
    }

    export class TLDRRoute implements RouteInterface {
        get(req: any, res: any, next: any) {
            res.render('privacy-policy-tldr')
        }
    }
}