import { IRoute } from "./IRoute";

export class AuthRoute implements IRoute {
    get(req: any, res: any) {
        throw new Error("Method not implemented.");
    }
    post(req: any, res: any) {
        throw new Error("Method not implemented.");
    }
    
}