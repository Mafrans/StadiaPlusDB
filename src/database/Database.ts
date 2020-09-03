import { MongoClient, Db, Collection } from 'mongodb';
import { Statistics } from './../models/Statistics.model';
import { User } from '../models/User.model';
import { Login } from '../models/Login.model';


export class Database {
    mongo: MongoClient;
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
    logins: Collection<Login>;

    constructor(db: Database) {
        this.db = db.mongo.db('auth');
        this.logins = this.db.collection('logins');
    }
}