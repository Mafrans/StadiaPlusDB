import { App } from "../App";

export class Google {
    public static async GET_ID(token: string): Promise<string> {
        return App.self.database.auth.getSession(token);
    }
}