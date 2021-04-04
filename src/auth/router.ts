import {Router} from "express";
import {authStart} from "./routes/google";
import {authCallback, authRedirect} from "./routes/callback";

const authRouter = Router();
authRouter.get('/google', authStart);
authRouter.get('/google/callback', authCallback, authRedirect);

export default authRouter;
