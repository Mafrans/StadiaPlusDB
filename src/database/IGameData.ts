export interface IGameData {
    gaia?: string;
    game: IGame;
    achievements: IAchievement[];
    user: IUser;
    time: number;
}

export interface IAchievement {
    id: string;
    name: string;
    description: string;
    value: number;
    icon: string;
    game: string;
}

interface IGame {
    uuid: string;
    name: string;
}

interface IUser {
    name: string;
    tag: string;
    avatar: string;
}