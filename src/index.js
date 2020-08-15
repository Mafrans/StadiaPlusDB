import { App } from "./App.ts";
import { AuthService } from "./services/AuthService.ts";
import { AuthRoutes } from "./routes/AuthRoutes.ts";
import { PingRoute } from "./routes/PingRoute.ts";
import { UserRoute } from "./routes/UserRoute.ts";
import { UpdateRoute } from "./routes/UpdateRoute.ts";
import { ProfileRoute } from "./routes/ProfileRoute.ts";
import config from '../config.json';

const app = new App();

app.use(new AuthService());

app.start(config.port)
    .then(() => {
        console.log(`Started server on port ${config.port}`);
    });