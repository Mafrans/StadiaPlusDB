import { AuthRoutes } from "./routes/AuthRoutes";
import { RouteInterface } from './routes/Route.interface';
import { UpdateRoute } from "./routes/UpdateRoute";
import { PingRoute } from "./routes/PingRoute";
import { UserRoute } from "./routes/UserRoute";
import { ProfileRoute } from "./routes/ProfileRoute";
import { AchievementsRoutes } from "./routes/AchievementsRoute";

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
        path: '/profile/:username/:tag', 
        classInstances: [new ProfileRoute()]
    },
    {
        path: '/profile/:username/:tag/achievements', 
        classInstances: [new AchievementsRoutes()]
    }
]
export default routes;

