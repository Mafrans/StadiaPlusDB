var component = {
    template: `
        <div class="search-bar border-light-gray uk-flex uk-flex-middle" :class="{wide: wide != undefined}">
            <i 
                class="material-icons c-dark-gray uk-margin-small-left uk-margin-small-right"
                style="pointer-events: none"
                >
                {{ icon }}
            </i>
            <input :value="value" v-on:keyup.enter="(e) => submit(e.srcElement)" class="c-dark-gray" type="text">
            <i 
                @click="(e) => submit(e.srcElement.previousElementSibling)" 
                class="material-icons c-dark-gray uk-margin-small-left uk-margin-small-left"
                style="cursor: pointer"
                >
                arrow_forward
            </i>
        </div>
    `,

    methods: {
        submit(el) {
            console.log(el);
            const text = el.value;

            if(text !== '') {
                location.href = `${location.origin}/search?q=${encodeURIComponent(text)}`;
            }
        }
    },

    props: [ 'icon', 'wide', 'value' ]
};

export default component;