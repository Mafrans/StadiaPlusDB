import {Router} from "express";
import {patreonHook} from "./routes/patreon";
import bodyParser from "body-parser";

const authRouter = Router();
authRouter.post('/patreon', bodyParser.text({type: '*/*'}), patreonHook);

export default authRouter;
