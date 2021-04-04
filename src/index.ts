import express from "express";
import session from "express-session";
import authRouter from "./auth/router";
import apiRouter from "./api/router";
import cors from "cors";
import {useGoogleOAuth} from "./auth/helpers";
import {config as loadDotEnv} from "dotenv";
import {connectMongoose} from "./database/helpers";

loadDotEnv();

// Load database
void connectMongoose('mongodb://localhost:27017/stadiaplus');

// Load server
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