import express from "express";
import session from "express-session";
import authRouter from "./routes/auth/router";
import apiRouter from "./routes/api/router";

const app = express();
const port = 3000;

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.use('/api', apiRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
})