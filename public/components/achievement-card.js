var component = {
    template: `
        <div class="achievement-card" :style="{width: wide ? '100%' : null}">
            <img :src="icon">
            <div style="width: calc(100% - 80px);"> <!-- Width is equal to 100% minus the icon width -->
                <h3>{{ name }}</h3>
                <p>{{ description }}</p>
            </div>
        </div>
    `,

    props: [ 'icon', 'name', 'description', 'wide' ]
};

export default component;