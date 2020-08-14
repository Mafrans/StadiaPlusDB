import { MongoClient, Db, Collection } from 'mongodb';
import { IGameData, IAchievement } from './IGameData';

export namespace Database {
    export class Client {
        mongo: MongoClient;
        games: Games;
        auth: Auth;
    
        async connect(uri: string) {
            this.mongo = await MongoClient.connect('mongodb://' + uri);

            this.auth = new Auth(this);
            this.games = new Games(this);
            
            return this;
        }
    }

    export class Games {
        db: Db;
        users: Collection<Database.IUser>;

        constructor(client: Database.Client) {
            this.db = client.mongo.db('games');
            this.users = this.db.collection('users');
        }

        public async addUser(gaia: string, data: IGameData) {
            const existing: IUser = await this.users.findOne({gaia: gaia});

            const game = {
                uuid: data.game.uuid,
                name: data.game.name,
                achievements: data.achievements,
                time: data.time
            }

            if(existing != null) {
                this.users.update({ 'gaia': gaia }, { $set: { ['games.' + data.game.uuid]: game }});
            }
            else {
                this.users.insertOne({
                    gaia: gaia,
                    games: { [game.uuid]: game },
                    username: data.user.name,
                    tag: data.user.tag,
                    avatar: data.user.avatar
                });
            }
        }

        public async getUser(gaia: string): Promise<IUser> {
            const data = await this.users.findOne({gaia: gaia});
            return data;
        }
    }

    export class Auth {
        db: Db;
        logins: Collection<Database.ILogin>;

        constructor(client: Database.Client) {
            this.db = client.mongo.db('auth');
            this.logins = this.db.collection('logins');
        }

        public async addLogin(token: string, gaia: string) {
            const existing: ILogin = await this.logins.findOne({token: token});
            const expiry: Date = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // Expires in 30 days

            if(existing != null) {
                existing.expiry = expiry;
                this.logins.update({token}, existing);
            }
            else {
                this.logins.insertOne({token, gaia, expiry});
            }
        }

        public async getLogin(token: string): Promise<string> {
            const login = await this.logins.findOne({token: token});
            
            if(login == null) return null; // Not logged in
            if(login.expiry.getTime() < Date.now()) { // Token has expired
                this.logins.remove({token: token});
            }

            return login.gaia;
        }
    }

    export interface ILogin {
        token: string;
        gaia: string;
        expiry: Date;
    }

    export interface IUser {
        gaia: string;
        games: {[uuid: string]: IGame};
        username: string;
        tag: string;
        avatar: string;
    }

    export interface IGame {
        uuid: string;
        name: string;
        achievements: IAchievement[];
        time: number;
    }
}