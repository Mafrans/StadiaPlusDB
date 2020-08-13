export interface IRoute {
    get?(req: any, res: any): void;
    post?(req: any, res: any): void;
}