import express from 'express';
import { Express } from 'express-serve-static-core';
import { IRoute } from './routes/IRoute';
import { IService } from './services/IService';
import { Database } from './database/Database';

export class App {
    server: Express;
    routes: {[path: string]: IRoute[]} = {};
    services: IService[] = [];
    database: Database.Client;
    static self: App;

    constructor() {
        this.server = express();
        this.database = new Database.Client();
        this.database.connect('localhost:27017/stadiaplus');
        App.self = this;
    }

    async start(port: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.server.listen(port, () => {
                resolve();
            });
    
            for (const path in this.routes) {
                const routes: IRoute[] = this.routes[path];
                
                const get = [];
                const post = [];
                for(const route of routes) {
                    if(route.get != null) get.push(route.get);
                    if(route.post != null) post.push(route.post);
                }

                this.server.get(path, get);
                this.server.post(path, post);
            }
    
            for (const service of this.services) {
                service.start(this);
            }
        })
    }

    route(path: string, ...routes: IRoute[]) {
        this.routes[path] = routes;
    }

    use(service: IService) {
        if(!this.services.includes(service)) {
            this.services.push(service);
        }
    }
}