import { AbstractRoute } from "./AbstractRoute";


export namespace PrivacyPolicyRoutes {
    export class MainRoute extends AbstractRoute {
        get(req: any, res: any, next: any) {
            res.render('privacy-policy')
        }
    }

    export class TLDRRoute extends AbstractRoute {
        get(req: any, res: any, next: any) {
            res.render('privacy-policy-tldr')
        }
    }
}