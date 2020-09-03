var component = {
    template: `
        <div class="divider uk-flex uk-width-1-1 uk-flex-middle uk-text-medium">
            <h3 class="c-dark-gray">
                <i class="material-icons">{{ icon }}</i>
                <slot></slot>
            </h3>
            <hr/>
            <p v-if="expand" class="c-gray" style="cursor: pointer" @click="$emit('expand')">
                Show all
                <i class="material-icons">keyboard_arrow_right</i>
            </p>
        </div>
    `,

    props: [ 'icon', 'expand' ]
};

export default component;