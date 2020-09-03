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
import { StadiaGameDBHook } from './StadiaGameDBHook';
import routes from './routes';

export class App {
    server: Express;
    services: Service[] = [];
    database: Database;
    stadiaGameDb: StadiaGameDBHook;
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
        this.database.connect(config.databaseURL);

        this.stadiaGameDb = new StadiaGameDBHook();
        this.stadiaGameDb.updateCache();

        App.self = this;
    }

    async start(port: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.registerRoutes();            
            this.registerServices();

            this.server.listen(port, () => {
                resolve();
            });
        })
    }
    private registerRoutes() {
        for (let route of routes) {
            
            const get = [];
            const post = [];
            for(const instance of route.classInstances) {
                if(instance.get != null) get.push(instance.get);
                if(instance.post != null) post.push(instance.post);
            }

            this.server.get(route.path, ...get);
            this.server.post(route.path, ...post);
        }

    }

    private registerServices() {
        for (const service of this.services) {
            service.start();
            console.log("starting", service.constructor.name)
        }
    }

    use(service: Service) {
        if(!this.services.includes(service)) {
            this.services.push(service);
        }
    }
}