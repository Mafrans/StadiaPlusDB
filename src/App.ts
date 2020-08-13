import express from 'express';
import { Express } from 'express-serve-static-core';
import { IRoute } from './routes/IRoute';
import { IService } from './services/IService';

export class App {
    server: Express;
    routes: IRoute[];
    services: IService[];
    static self: App;

    constructor() {
        this.server = express();
        App.self = this;
    }

    async start(port: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.server.listen(port, () => {
                resolve();
            });
    
            for (const route of this.routes) {
                this.server.get(route.path, (req, res) => route.get(req, res));
                this.server.post(route.path, (req, res) => route.get(req, res));
            }
    
            for (const service of this.services) {
                service.start(this);
            }
        })
    }

    route(route: IRoute) {
        if(!this.routes.includes(route)) {
            this.routes.push(route);
        }
    }

    use(service: IService) {
        if(!this.services.includes(service)) {
            this.services.push(service);
        }
    }
}