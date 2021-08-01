import express from "express";
import session from "express-session";
import authRouter from "./auth/router";
import apiRouter from "./api/router";
import hooksRouter from "./hooks/router";
import cors from "cors";
import {useGoogleOAuth, usePassport} from "./auth/helpers";
import {config as loadDotEnv} from "dotenv";
import path from "path";
import { PrismaClient } from "@prisma/client";

loadDotEnv();

// Load database
export const prisma = new PrismaClient();

// Load server
const app = express();
const port = process.env["PORT"] ?? 3000;

// Enable middleware
usePassport(app);
useGoogleOAuth();
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use('/public', express.static(__dirname));
app.use(cors());

// If the url does not begin with 'auth', 'hooks' or 'api' - serve the react application
app.get("*", ((req, res, next) => {
    // If the url includes a '.' anywhere, serve whatever the react middleware wants
    if(req.url.includes('.')
        || req.url.startsWith('/api')
        || req.url.startsWith('/auth')
        || req.url.startsWith('/hooks')
    ) {
        return next();
    }
    res.sendFile(path.join(__dirname, '../dist/index.html'));
}))

// Load routes
app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.use('/hooks', hooksRouter);

// Start
app.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
})