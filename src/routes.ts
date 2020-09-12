import { AuthRoutes } from "./routes/api/AuthRoutes";
import { RouteInterface } from './routes/Route.interface';
import { UpdateRoute } from "./routes/api/UpdateRoute";
import { PingRoute } from "./routes/api/PingRoute";
import { UserRoute } from "./routes/api/UserRoute";
import { ProfileRoute } from "./routes/ProfileRoute";
import { AchievementsRoute } from "./routes/AchievementsRoute";
import { ProfileRedirectRoute } from "./routes/ProfileRedirectRoute";
import { GameRoute } from "./routes/GameRoute";
import { GamesRoute } from "./routes/GamesRoute";
import { IndexRoute } from "./routes/IndexRoute";
import { WipeDataRoute } from "./routes/api/WipeDataRoute";
import { PrivacyPolicyRoutes } from "./routes/PrivacyPolicyRoutes";
import { TermsAndConditionsRoutes } from "./routes/TermsAndConditionsRoutes";
import { SearchRoute } from "./routes/SearchRoute";
import RateLimit from "express-rate-limit";
import { ProfileAPIRoutes } from "./routes/api/ProfileAPIRoutes";
export interface Route {
    path: string;
    classInstances: RouteInterface[];
    limiter?: RateLimit.Options;
} 

const routes: Route[] = [
    {
        path: "/auth/google", 
        classInstances: [new AuthRoutes.Start()]
    },
    {
        path: '/auth/google/callback', 
        classInstances: [new AuthRoutes.Callback(), new AuthRoutes.Redirect()]
    },
    {
        path: '/api/signout',
        classInstances: [new AuthRoutes.Signout()]
    },
    {
        path: '/api/wipedata',
        classInstances: [new WipeDataRoute()]
    },
    {
        path: '/api/update', 
        classInstances: [new UpdateRoute()]
    },
    {
        path: '/api/ping',
        classInstances: [new PingRoute()]
    },
    {
        path: '/api/user', 
        classInstances: [new UserRoute()]
    },
    {
        path: '/api/profile/list', 
        classInstances: [new ProfileAPIRoutes.ProfilesRoute()]
    },
    {
        path: '/api/profile/:username/:tag', 
        classInstances: [new ProfileAPIRoutes.ProfileRoute()]
    },
    {
        path: '/profile/:username/', 
        classInstances: [new ProfileRedirectRoute()]
    },
    {
        path: '/profile/:username/:tag', 
        classInstances: [new ProfileRoute()]
    },
    {
        path: '/profile/:username/:tag/achievements', 
        classInstances: [new AchievementsRoute()]
    },
    {
        path: '/profile/:username/:tag/game/:game', 
        classInstances: [new GameRoute()]
    },
    {
        path: '/profile/:username/:tag/games', 
        classInstances: [new GamesRoute()]
    },
    {
        path: '/privacy-policy', 
        classInstances: [new PrivacyPolicyRoutes.MainRoute()]
    },
    {
        path: '/privacy-policy/tldr', 
        classInstances: [new PrivacyPolicyRoutes.TLDRRoute()]
    },
    {
        path: '/terms-and-conditions', 
        classInstances: [new TermsAndConditionsRoutes.MainRoute()]
    },
    {
        path: '/terms-and-conditions/tldr', 
        classInstances: [new TermsAndConditionsRoutes.TLDRRoute()]
    },
    {
        path: '/search', 
        classInstances: [new SearchRoute()]
    },
    {
        path: '/', 
        classInstances: [new IndexRoute()]
    }
]
export default routes;

