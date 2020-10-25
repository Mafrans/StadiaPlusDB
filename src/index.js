import { App } from "./App.ts";
import { AuthService } from "./services/AuthService.ts";
import { AuthRoutes } from "./routes/api/AuthRoutes.ts";
import { PingRoute } from "./routes/api/PingRoute.ts";
import { UserRoute } from "./routes/api/UserRoute.ts";
import { UpdateRoute } from "./routes/api/UpdateRoute.ts";
import { ProfileRoute } from "./routes/ProfileRoute.ts";
import config from '../config.json';

const app = new App();

app.use(new AuthService());

app.start(config.port)
    .then(() => {
        console.log(`Started server on port ${config.port}`);
    });