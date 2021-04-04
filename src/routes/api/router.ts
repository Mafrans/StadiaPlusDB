import {Router} from "express";
import {apiPing} from "./ping";

const apiRouter = Router();
apiRouter.get('/ping', apiPing);

export default apiRouter;
