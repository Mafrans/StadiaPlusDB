var component = {
    template: `
        <div class="stat-card c-dark-gray uk-flex-inline uk-flex-column uk-flex-center uk-flex-middle uk-text-center">
            <h1 class="sc-slot uk-text-normal">
                <slot></slot>
            </h1>
            <p class="sc-title">{{ title }}</p>
        </div>
    `,

    props: [ 'title' ],
};

export default component;