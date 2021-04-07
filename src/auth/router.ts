import {Router} from "express";
import {authGoogle} from "./routes/google";
import {authGoogleCallback, authGoogleRedirect} from "./routes/googleCallback";
import {authPatreon} from "./routes/patreon";
import {authPatreonCallback} from "./routes/patreonCallback";

const authRouter = Router();
authRouter.get('/google', authGoogle);
authRouter.get('/google/callback', authGoogleCallback, authGoogleRedirect);
authRouter.get('/patreon', authPatreon);
authRouter.get('/patreon/callback', authPatreonCallback);

export default authRouter;
