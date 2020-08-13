const { App } = require("./App");

const app = new App();
app.start(3000)
    .then(() => {
        console.log("Started server on port 3000")
    });