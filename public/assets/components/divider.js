var component = {
    template: `
        <div class="divider">
            <h3>
                <i class="material-icons">{{ icon }}</i>
                <slot></slot>
            </h3>
            <hr/>
            <p v-if="expand" class="divider-expand" @click="$emit('expand')">
                <i class="material-icons">expand_more</i>
                Show all
            </p>
        </div>
    `,

    props: [ 'icon', 'expand' ]
};

export default component;