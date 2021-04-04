import {Router} from "express";
import {apiPing} from "./ping";
import cors from "cors";

const apiRouter = Router();
apiRouter.get('/ping', cors(), apiPing);

export default apiRouter;
