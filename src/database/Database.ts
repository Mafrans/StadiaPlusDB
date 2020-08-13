import { MongoClient, Db, Collection } from 'mongodb';

export namespace Database {
    export class Client {
        mongo: MongoClient;
        users: Games;
        logins: Auth;
    
        async connect(uri: string) {
            this.mongo = await MongoClient.connect('mongodb://' + uri);

            this.logins = new Auth();
            this.logins.db = this.mongo.db('auth');

            this.users = new Games(this);
            
            return this;
        }
    }

    export class Games {
        db: Db;
        users: Collection<Database.User>;

        constructor(client: Database.Client) {
            this.users = this.db.collection('users');
            this.db = client.mongo.db('games');
        }
    }

    export class Auth {
        db: Db;
        logins: Collection<Database.Login>;

        constructor() {
            this.logins = this.db.collection('logins');
        }

        async addLogin(token: string, gaia: string) {
            const existing: Login = await this.logins.findOne({token: token});
            const expiry: Date = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // Expires in 30 days

            if(existing == null) {
                existing.expiry = expiry;
                this.logins.update({token}, existing);
            }
            else {
                this.logins.insert({token, gaia, expiry});
            }
        }
    }

    export interface Login {
        token: string;
        gaia: string;
        expiry: Date;
    }

    export interface User {
        gaia: string;
        games: object;
        username: string;
        tag: string;
        avatar: string;
    }
}