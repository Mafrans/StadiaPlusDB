import { AuthRoutes } from "./routes/AuthRoutes";
import { RouteInterface } from './routes/Route.interface';
import { UpdateRoute } from "./routes/UpdateRoute";
import { PingRoute } from "./routes/PingRoute";
import { UserRoute } from "./routes/UserRoute";
import { ProfileRoute } from "./routes/ProfileRoute";
import { AchievementsRoute } from "./routes/AchievementsRoute";
import { ProfileRedirectRoute } from "./routes/ProfileRedirectRoute";
import { GameRoute } from "./routes/GameRoute";
import { GamesRoute } from "./routes/GamesRoute";
import { IndexRoute } from "./routes/IndexRoute";
import { WipeDataRoute } from "./routes/WipeDataRoute";
import { PrivacyPolicyRoutes } from "./routes/PrivacyPolicyRoutes";

export interface Route {
    path: string;
    classInstances: RouteInterface[];
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
        path: '/', 
        classInstances: [new IndexRoute()]
    }
]
export default routes;

