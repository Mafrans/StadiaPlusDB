var component = {
    template: `
        <div class="search-bar border-light-gray uk-flex uk-flex-middle">
            <i class="material-icons c-dark-gray uk-margin-small-left uk-margin-small-right">{{ icon }}</i>
            <input class="c-dark-gray" :id="id" type="text">
        </div>
    `,

    data() {
        return {
            id: ""
        }
    },

    created() {
        this.id = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').sort(() => Math.round(Math.random() * 2)-1).slice(0, 16).join('');
    },

    props: [ 'icon' ]
};

export default component;