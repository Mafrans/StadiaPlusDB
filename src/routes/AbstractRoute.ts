export class AbstractRoute {
    get?(req: Express.Request, res: Express.Response, next: any): void;
    post?(req: Express.Request, res: Express.Response, next: any): void;

    static getToken(req: any): string {
        const header = req.headers.authorization;
        const token = header && header.substring('Bearer '.length);

        return token;
    }
}