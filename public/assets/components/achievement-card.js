var component = {
    template: `
        <div 
            class="achievement-card uk-flex-inline uk-flex-middle" 
            :style="{width: wide ? '100%' : null}" 
            :class="{diamond: rarity <= 5, gold: rarity <= 10, silver: rarity <= 25, bronze: rarity <= 50}"
        >
            <img :src="icon">
            <div :style="{maxWidth: rarity <= 50 ? '60%' : 'calc(100% - 80px)'}">
                <h3 class="c-charcoal uk-text-medium uk-width-1-1">{{ name }}</h3>
                <p class="c-gray">{{ description }}</p>
            </div>
            <div v-if="rarity <= 50" class="c-dark-gray uk-visible@s uk-text-normal uk-text-italic uk-margin-auto-left">
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
    }
};

export default component;