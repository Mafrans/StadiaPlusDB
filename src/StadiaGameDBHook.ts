import fetch from 'node-fetch';

export class StadiaGameDBHook {
    cache: {[uuid: string]: SGDBGame} = {};
    lastUpdate: Date;
    async updateCache() {
        if(this.lastUpdate != null && Date.now() - this.lastUpdate.getTime() < 1000 * 60 * 60) return;

        const uuidMap = (await (await fetch('https://stadiagamedb.com/data/uuidmap.json')).json()).uuidMap;
        const gameData = (await (await fetch('https://stadiagamedb.com/data/gamedb.json')).json()).data;

        if(uuidMap == null || gameData == null) return;

        for(const uuid in uuidMap) {
            const game = gameData[uuidMap[uuid]];
            this.cache[uuid] = {
                image: 'https://stadiagamedb.com/' + game[0].match(/(images\/posters\/[a-z0-9_.-]+.png)/g)[0],
                name: game[1],
                tags: (game[2] + ", " + game[5]).split(", "),
                release: game[3],
                resolution: game[4],
            };
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