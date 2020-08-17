var component = {
    template: `
        <div class="achievement-card" :style="{width: wide ? '100%' : null}" :class="{diamond: rarity <= 5, gold: rarity <= 10, silver: rarity <= 25, bronze: rarity <= 50}">
            <img :src="icon">
            <div :style="{maxWidth: rarity <= 50 ? '60%' : 'calc(100% - 80px)'}">
                <h3>{{ name }}</h3>
                <p>{{ description }}</p>
            </div>
            <div v-if="rarity <= 50" class="stats">
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