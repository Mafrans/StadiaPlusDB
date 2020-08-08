var fetch = require('node-fetch');
var games = [];
module.exports = {

    connect() {
        games = [];
        
        fetch('https://stadiagamedb.com/data/uuidmap.json')
        .then(response => response.json())
        .then(data => {
            const uuidMap = data.uuidMap;

            fetch('https://stadiagamedb.com/data/gamedb.json')
            .then(response => response.json())
            .then(gameData => {
                const gameList = gameData.data;

                Object.keys(uuidMap).forEach((uuid) => {
                    const game = gameList[uuidMap[uuid]];
                    
                    games[uuid] = {
                        image: 'https://stadiagamedb.com/' + game[0].match(/(images\/posters\/[a-z0-9_.-]+.png)/g)[0],
                        name: game[1],
                        tags: (game[2] + ", " + game[5]).split(", "),
                        release: game[3],
                        resolution: game[4],
                    }
                })
            });
        })
        .catch(console.error);
    },

    getGame(uuid) {
        return games[uuid];
    },
}