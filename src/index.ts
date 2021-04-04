import express from "express";
import session from "express-session";
import authRouter from "./routes/auth/router";
import apiRouter from "./routes/api/router";
import cors from "cors";
import {useGoogleOAuth} from "./routes/auth/helpers";
import {config as loadDotEnv} from "dotenv";

// Load server
loadDotEnv();
const app = express();
const port = 3000;

// Enable middleware
useGoogleOAuth();
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.options('*', cors())

// Load routes
app.use('/api', apiRouter);
app.use('/auth', authRouter);

// Start
app.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
})