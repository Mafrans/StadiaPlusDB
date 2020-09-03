import { RouteInterface } from './Route.interface';

export class ProfileRedirectRoute implements RouteInterface {
    async get(req: any, res: any, next: any) {
        res.redirect(`/profile/${req.params.username}/0000`);
    }
}
