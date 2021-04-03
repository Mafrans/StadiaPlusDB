import {Router} from "express";
import {authStart} from "./google";
import {authCallback, authRedirect} from "./callback";

const router = Router();
router.get('/google', authStart);
router.get('/callback', authCallback, authRedirect);

export default router;
