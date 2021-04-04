import {Router} from "express";
import {authStart} from "./google";
import {authCallback, authRedirect} from "./callback";

const authRouter = Router();
authRouter.get('/google', authStart);
authRouter.get('/callback', authCallback, authRedirect);

export default authRouter;
