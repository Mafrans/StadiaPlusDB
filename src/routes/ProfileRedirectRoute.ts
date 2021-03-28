import { AbstractRoute } from './AbstractRoute';

export class ProfileRedirectRoute extends AbstractRoute {
    async get(req: any, res: any, next: any) {
        res.redirect(`/profile/${req.params.username}/0000`);
    }
}
