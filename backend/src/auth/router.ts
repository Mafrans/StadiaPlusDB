import {Router} from "express";
import {authGoogle} from "./routes/google";
import {authGoogleCallback, authGoogleRedirect} from "./routes/googleCallback";
import {authPatreon} from "./routes/patreon";
import {authPatreonCallback} from "./routes/patreonCallback";

const authRouter = Router();
authRouter.post('/google', authGoogle);
authRouter.post('/google/callback', authGoogleCallback, authGoogleRedirect);
authRouter.post('/patreon', authPatreon);
authRouter.post('/patreon/callback', authPatreonCallback);

export default authRouter;
