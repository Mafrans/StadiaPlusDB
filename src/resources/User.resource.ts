import { JsonResource } from "./Json.resource";

export class UserResource extends JsonResource {
    public toString(): any {
        return {
            name: this.model.username,
            tag: this.model.tag,
            avatar: this.model.avatar,
            games: this.model.games
        }
    }
}