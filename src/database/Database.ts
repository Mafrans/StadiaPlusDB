import mongoose, { Connection } from 'mongoose';

export class Database {
    connection: Connection;

    async connect(uri: string): Promise<Database> {
        return new Promise((resolve, reject) => {
            mongoose.connect('mongodb://' + uri, { useNewUrlParser: true });
            this.connection = mongoose.connection;
    
            this.connection.once('open', () => resolve(this));
            this.connection.once('error', () => reject(this));
        })
    }
}