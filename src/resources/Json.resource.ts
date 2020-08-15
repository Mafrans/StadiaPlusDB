export abstract class JsonResource {

    model: any;

    constructor(obj: any) {
        this.model = obj;
    }

    public toString(): string | any {
        return this.model.toString();
    }
}