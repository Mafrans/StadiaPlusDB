import express from "express";
import session from "express-session";
import authRoutes from "./routes/auth/google";

const app = express();
const port = 3000;

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
})