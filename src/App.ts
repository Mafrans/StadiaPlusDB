import express from 'express';
import { Express } from 'express-serve-static-core';

export class App {
    server: Express;
    constructor() {
        this.server = express();
    }

    async start(port): Promise<void> {
        this.server.listen(port, () => {
            Promise.resolve();
        });
    }
}