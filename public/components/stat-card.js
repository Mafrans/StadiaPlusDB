var component = {
    template: `
        <div class="stat-card">
            <h1 class="sc-slot">
                <slot></slot>
            </h1>
            <p class="sc-title">{{ title }}</p>
        </div>
    `,

    props: [ 'title' ],
};

export default component;