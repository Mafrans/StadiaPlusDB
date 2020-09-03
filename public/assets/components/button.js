var component = {
    template: `
        <a class="button bg-light-gray uk-flex-inline uk-flex-middle" @click="click()" :class="{'bg-gradient': gradient != undefined, [gradient != undefined ? 'c-white' : 'c-dark-gray']: true}">
            <i class="material-icons">{{ icon }}</i>
            <slot></slot>
        </a>
    `,

    methods: {
        click() {
            this.$emit('click');
        }
    },
    
    mounted() {
        console.log(this.gradient)
    },

    props: [ 'gradient', 'icon' ]
};

export default component;