var component = {
    template: `
        <div class="search-bar border-light-gray uk-flex uk-flex-middle" :class="{wide: wide != undefined}">
            <i class="material-icons c-dark-gray uk-margin-small-left uk-margin-small-right">{{ icon }}</i>
            <input v-on:keyup.enter="submit" class="c-dark-gray" type="text">
        </div>
    `,

    methods: {
        submit(e) {
            const el = e.srcElement;
            const text = el.value;

            if(text !== '') {
                location.href = `${location.origin}/search?query=${encodeURIComponent(text)}`;
            }
        }
    },

    props: [ 'icon', 'wide' ]
};

export default component;