export interface IRoute {
    path: string;
    get(req: any, res: any);
    post(req: any, res: any);
}