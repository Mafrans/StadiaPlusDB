import express from 'express';
import { Express } from 'express-serve-static-core';
import { IRoute } from './IRoute';

export class App {
    server: Express;
    routes: IRoute[];

    constructor() {
        this.server = express();
    }

    async start(port: number): Promise<void> {
        this.server.listen(port, () => {
            Promise.resolve();
        });

        for (const route of this.routes) {
            this.server.get(route.path, (req, res) => route.get(req, res));
            this.server.post(route.path, (req, res) => route.get(req, res));
        }
    }

    register(route: IRoute) {
        if(!this.routes.includes(route)) {
            this.routes.push(route);
        }
    }
}