import { Database } from '../database/Database';
export class Login implements LoginInterface {
    constructor(
        public token: string,
        public gaia: string,
        public expiry: Date
    ) {}

    public static async Create(token: string, gaia: string) {
        const logins = Database.self.auth.logins;
        const existing: Login = await logins.findOne({ token: token });
        const expiry: Date = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // Expires in 30 days

        if (existing != null) {
            existing.expiry = expiry;
            logins.update({ token }, existing);
        } else {
            logins.insertOne({ token, gaia, expiry });
        }
    }

    public static async Remove(token: string) {
        return Database.self.auth.logins.remove({ token });
    }

    public static async Signout(token: string) {
        const gaia: string = await Login.Find(token);
        return Database.self.auth.logins.deleteMany({ gaia });
    }

    public static async Find(token: string): Promise<string> {
        const logins = Database.self.auth.logins;

        const login = await logins.findOne({ token: token });
        if (login == null) return null; // Not logged in
        if (login.expiry.getTime() < Date.now()) {
            // Token has expired
            Login.Remove(token);
        }

        return login.gaia;
    }
}

export interface LoginInterface {
    token: string;
    gaia: string;
    expiry: Date;
}
