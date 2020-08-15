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
app.route('/auth/google', new AuthRoutes.Start());
app.route('/auth/signout', new AuthRoutes.Signout());
app.route('/auth/google/callback', new AuthRoutes.Callback(), new AuthRoutes.Redirect());
app.route('/api/update', new UpdateRoute());
app.route('/api/ping', new PingRoute());
app.route('/api/user', new UserRoute());
app.route('/profile/:username/:tag', new ProfileRoute());

app.start(config.port)
    .then(() => {
        console.log(`Started server on port ${config.port}`);
    });