import { Login } from "./Login.model";

export class Google {
    public static async GET_ID(token: string): Promise<string> {
        return Login.Find(token);
    }
}