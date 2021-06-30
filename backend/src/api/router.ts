import {Router} from "express";
import {apiPing} from "./routes/ping";
import cors from "cors";
import {apiProfileSelf} from "./routes/profile/profileSelf";
import {apiProfile} from "./routes/profile/profile";
import {apiProfileRedirect} from "./routes/profile/profileRedirect";
import bodyParser from "body-parser";
import {apiProfileUpdate} from "./routes/profile/profileUpdate";
import {apiAchievements} from "./routes/achievements/achievements";
import {apiAchievementsCount} from "./routes/achievements/achievementsCount";
import {apiHistory} from "./routes/history/history";
import {apiAchievementRarity} from "./routes/achievements/achievementRarity";

const apiRouter = Router();
apiRouter.get('/ping', cors(), apiPing);
apiRouter.get('/profile/self', cors(), apiProfileSelf);
apiRouter.post('/profile/update', cors(), bodyParser.json(), apiProfileUpdate);
apiRouter.get('/profile/:name', cors(), apiProfileRedirect);
apiRouter.get('/profile/:name/:tag', cors(), apiProfile);
apiRouter.get('/achievements/:name/:tag', cors(), apiAchievements);
apiRouter.get('/achievements/:name/:tag/count', cors(), apiAchievementsCount);
apiRouter.get('/achievements/rarity/:game/:index', cors(), apiAchievementRarity);
apiRouter.get('/history/:name/:tag', cors(), apiHistory);


export default apiRouter;
