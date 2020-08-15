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
        statistics: Collection<Database.IGameStats>;

        constructor(client: Database.Client) {
            this.db = client.mongo.db('games');
            this.users = this.db.collection('users');
            this.statistics = this.db.collection('statistics');
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

                if(!Object.keys(existing.games).includes(game.uuid)) {
                    await this.addGame(game.uuid);
                }
                else {
                    for(const achievement of game.achievements) {
                        const achievementID = achievement.icon.substring("https://lh3.googleusercontent.com/".length);
                        if(existing.games[game.uuid].achievements.find(e => e.icon === achievement.icon) == null) {
                            await this.addAchievement(game.uuid, achievementID);
                        }
                    }
                }
            }
            else {
                this.users.insertOne({
                    gaia: gaia,
                    games: { [game.uuid]: game },
                    username: data.user.name,
                    tag: data.user.tag,
                    avatar: data.user.avatar
                });
                
                await this.addGame(game.uuid);

                for(const achievement of game.achievements) {
                    const achievementID = achievement.id;
                    await this.addAchievement(game.uuid, achievementID);
                }
            }
        }

        public async addAchievement(gameUUID: string, achievementID: string) {
            const existing: IGameStats = await this.statistics.findOne({ uuid: gameUUID });

            if(existing == null) {
                const stats: IGameStats = {
                    uuid: gameUUID,
                    owners: 1,
                    achievements: {
                        [achievementID]: 1
                    }
                };

                // Important that we await this, because otherwise the values will be completely off
                await this.statistics.insertOne(stats)
            }
            else {
                this.statistics.update({ uuid: gameUUID }, { $inc: { ['achievements.' + achievementID]: 1 } }); // Add one to the achivement
            }
        }

        public async getStats(uuid: string): Promise<IGameStats> {
            return await this.statistics.findOne({uuid: uuid});
        }

        public async addGame(uuid: string) {
            const existing: IGameStats = await this.statistics.findOne({ uuid: uuid });
            if(existing == null) {
                const stats: IGameStats = {
                    uuid: uuid,
                    owners: 1,
                    achievements: {}
                };
                
                // Important that we await this, because otherwise the values will be completely off
                await this.statistics.insertOne(stats);
            }
            else {
                this.statistics.update({ uuid: uuid }, { $inc: { owners: 1 }}); // Add 1 to owners
            }
        }

        public async getUser(gaia: string): Promise<IUser> {
            const data = await this.users.findOne({gaia: gaia});
            return data;
        }

        public async getProfile(username: string, tag: string): Promise<IUser> {
            const data = await this.users.findOne({username: username, tag: tag});
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

        public async addSession(token: string, gaia: string) {
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

        public async removeSession(token: string) {
            await this.logins.remove({token: token});
        }

        public async getSession(token: string): Promise<string> {
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

    export interface IGameStats {
        uuid: string,
        owners: number,
        achievements: { [icon: string]: number }
    }
}