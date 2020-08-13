const { App } = require("./App");
const { AuthService } = require("./services/AuthService");

const app = new App();

app.use(new AuthService());

app.start(3000)
    .then(() => {
        console.log("Started server on port 3000")
    });