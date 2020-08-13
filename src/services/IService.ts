import { App } from "../App";

export interface IService {
    start(app: App): void;
}