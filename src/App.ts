import express from 'express';
import { Express } from 'express-serve-static-core';
import { IRoute } from './routes/IRoute';
import { IService } from './services/IService';
import { Database } from './database/Database';

export class App {
    server: Express;
    routes: {[path: string]: IRoute};
    services: IService[];
    database: Database.Client;
    static self: App;

    constructor() {
        this.server = express();
        this.database.connect('');
        App.self = this;
    }

    async start(port: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.server.listen(port, () => {
                resolve();
            });
    
            for (const path in this.routes) {
                const route: IRoute = this.routes[path];
                this.server.get(path, (req, res) => route.get(req, res));
                this.server.post(path, (req, res) => route.get(req, res));
            }
    
            for (const service of this.services) {
                service.start(this);
            }
        })
    }

    route(path: string, route: IRoute) {
        this.routes[path] = route;
    }

    use(service: IService) {
        if(!this.services.includes(service)) {
            this.services.push(service);
        }
    }
}