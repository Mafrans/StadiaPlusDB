var component = {
    template: `
        <div class="achievement-card" :style="{width: wide ? '100%' : null}">
            <img :src="icon">
            <div style="max-width: calc(100% - 80px);"> <!-- Width is equal to 100% minus the icon width -->
                <h3>{{ name }}</h3>
                <p>{{ description }}</p>
            </div>
            <div v-if="rarity < 50" class="stats">
                Top {{ parseRarity(rarity) }}%
            </div>
        </div>
    `,

    props: [ 'icon', 'name', 'description', 'rarity', 'wide' ],

    methods: {
        parseRarity(percent) {
            if(percent < 10) {
                return percent.toFixed(2);
            }
            else {
                return Math.round(percent);
            }
        }
    },

    mounted() {
        console.log(this.name + ":", this.rarity);
    }
};

export default component;