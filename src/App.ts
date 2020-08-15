import express from 'express';
import session from 'express-session';
import { Express } from 'express-serve-static-core';
import { RouteInterface } from './routes/Route.interface';
import { Service } from './services/Service.interface';
import { Database } from './database/Database';
import passport from 'passport';
import config from '../config.json';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as path from 'path';
import { StadiaGameDBHook } from './StadiaGameDBHook';

export class App {
    server: Express;
    routes: {[path: string]: RouteInterface[]} = {};
    services: Service[] = [];
    database: Database;
    stadiagamedb: StadiaGameDBHook;
    static self: App;

    constructor() {
        this.server = express();

        // Set EJS as the default engine
        this.server.engine('ejs', require('ejs').__express);
        this.server.set('view engine', 'ejs');

        // Allow reading the body of post requests
        this.server.use(bodyParser.json());

        // Set the folder paths
        this.server.use(express.static('public/assets'));
        this.server.set('views', 'public/docs');

        // Make sure Stadia+ can communicate with the server
        this.server.use(cors());
        this.server.use(session({ secret: config.sessionSecret }));

        // Initialize passport
        this.server.use(passport.initialize());
        this.server.use(passport.session());

        this.database = new Database();
        this.database.connect('localhost:27017');

        this.stadiagamedb = new StadiaGameDBHook();
        this.stadiagamedb.updateCache();

        App.self = this;
    }

    async start(port: number): Promise<void> {
        return new Promise((resolve, reject) => {
            for (const path in this.routes) {
                const routes: RouteInterface[] = this.routes[path];

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
                service.start();
                console.log("starting")
            }

            console.log("listening")
            this.server.listen(port, () => {
                resolve();
            });
        })
    }

    route(path: string, ...routes: RouteInterface[]) {
        this.routes[path] = routes;
    }

    use(service: Service) {
        if(!this.services.includes(service)) {
            this.services.push(service);
        }
    }
}