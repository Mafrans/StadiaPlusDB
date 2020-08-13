const { App } = require("./App");
const { AuthService } = require("./services/AuthService");
const { AuthRoutes } = require("./routes/AuthRoutes");

const app = new App();

app.use(new AuthService());
app.route('/auth/google', new AuthRoutes.Start());
app.route('/auth/google/callback', new AuthRoutes.Callback(), new AuthRoutes.Redirect());

app.start(3000)
    .then(() => {
        console.log("Started server on port 3000")
    });