import { MongoClient, Db, Collection } from 'mongodb';
import { IGameData, IAchievement } from './IGameData';
import { Statistics } from './../models/Statistics.model';
import { User } from '../models/User.model';


export class Database {
    mongo: MongoClient;
    public user: User;
    gameDb: Games;
    auth: Auth;
    static self: Database;

    constructor() {
        Database.self = this; 
    }
    async connect(uri: string) {
        this.mongo = await MongoClient.connect('mongodb://' + uri);

        this.auth = new Auth(this);
        this.gameDb = new Games(this);

        return this;
    }
}

export class Games {
    db: Db;
    users: Collection<User>;
    statistics: Collection<Statistics>;

    constructor(db: Database) {
        this.db = db.mongo.db('games');
        this.users = this.db.collection('users');
        this.statistics = this.db.collection('statistics');
    }
}

export class Auth {
    db: Db;
    logins: Collection<ILogin>;

    constructor(db: Database) {
        this.db = db.mongo.db('auth');
        this.logins = this.db.collection('logins');
    }

    public async addSession(token: string, gaia: string) {
        const existing: ILogin = await this.logins.findOne({ token: token });
        const expiry: Date = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // Expires in 30 days

        if (existing != null) {
            existing.expiry = expiry;
            this.logins.update({ token }, existing);
        }
        else {
            this.logins.insertOne({ token, gaia, expiry });
        }
    }

    public async removeSession(token: string) {
        await this.logins.remove({ token: token });
    }

    public async getSession(token: string): Promise<string> {
        const login = await this.logins.findOne({ token: token });

        if (login == null) return null; // Not logged in
        if (login.expiry.getTime() < Date.now()) { // Token has expired
            this.logins.remove({ token: token });
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
    games: { [uuid: string]: IGame };
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

export interface IGameStats {
    uuid: string,
    owners: number,
    achievements: { [icon: string]: number }
}
