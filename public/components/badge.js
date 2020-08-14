var component = {
    template: `
        <div class="badge">
            <i class="material-icons" :style="{color}">{{ icon }}</i>
            <slot></slot>
        </div>
    `,

    props: [ 'icon', 'color' ]
};

export default component;