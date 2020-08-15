export interface IRoute {
    get?(req: any, res: any, next: any): void;
    post?(req: any, res: any, next: any): void;
}