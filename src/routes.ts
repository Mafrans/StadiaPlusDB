import { AuthRoutes } from "./routes/AuthRoutes";
import { RouteInterface } from './routes/Route.interface';

export interface Route {
    path: string;
    class: RouteInterface;
} 

const routes: Route[] = [
    {
        path: "/auth/google", 
        class: new AuthRoutes.Start()
    },
]
export default routes;

