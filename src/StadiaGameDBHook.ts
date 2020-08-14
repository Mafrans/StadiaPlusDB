export class StadiaGameDB {
    cache: {[uuid: string]: SGDBGame} = {};
    lastUpdate: Date;
    async updateCache() {
        if(Date.now() - this.lastUpdate.getTime() < 1000 * 60 * 60) return;

        const uuidMap = (await (await fetch('https://stadiagamedb.com/data/uuidmap.json')).json()).uuidMap;
        const gameData = (await (await fetch('https://stadiagamedb.com/data/gamedb.json')).json()).data;

        if(uuidMap == null || gameData == null) return;

        for(const uuid in uuidMap) {
            const game = gameData[uuid];
            this.cache[uuid] = game;
        }

        this.lastUpdate = new Date();
    }

    getGame(uuid: string): SGDBGame {
        return this.cache[uuid];
    }
}

class SGDBGame {
    image: string;
    name: string;
    tags: string[];
    release: string;
    resolution: string;
}