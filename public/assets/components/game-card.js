var component = {
    template: `
        <div class="game-card uk-flex-inline" :style="{'background-image': 'url(' + image + ')'}">
            <div class="gc-text-container">
                <h3 class="c-white uk-text-medium uk-width-1-1">{{ name }}</h3>
                <p class="c-white">Played for {{ parseTime(playTime)[0] }}h {{ parseTime(playTime)[1] }}m</p>
            </div>
        </div>
    `,

    props: [ 'name', 'playTime', 'image' ],

    methods: {
        parseTime(seconds) {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor(seconds / 60) - hours * 60;
            
            const out = [];
            if(hours > 0) out.push(hours);
            if(minutes > 0) out.push(minutes);

            return out;
        }
    }
};

export default component;