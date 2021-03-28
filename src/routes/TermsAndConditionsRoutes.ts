import { AbstractRoute } from "./AbstractRoute";


export namespace TermsAndConditionsRoutes {
    export class MainRoute extends AbstractRoute {
        get(req: any, res: any, next: any) {
            res.render('terms-and-conditions')
        }
    }

    export class TLDRRoute extends AbstractRoute {
        get(req: any, res: any, next: any) {
            res.render('terms-and-conditions-tldr')
        }
    }
}