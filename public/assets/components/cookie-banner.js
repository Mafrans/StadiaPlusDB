import Button from '/components/button.js';

var component = {
    template: `
        <div v-if="!accepted" class="bg-white cookie-banner border-light-gray uk-container uk-container-small">
            <div uk-grid>
                <div class="uk-width-2-3@s">
                    <p class="c-dark-gray">
                        Stadia+ needs to use cookies and collect some personally identifiable data. By using Stadia+, you consent to this.
                    </p>
                    
                    <a
                        class="c-tomato uk-display-block uk-margin-small-top uk-text-medium"
                        href="/privacy-policy/tldr"
                        target="_blank"
                    >
                        How we use your data (in brief)<i class="material-icons">arrow_forward</i>
                    </a>
                </div>
                <div class="uk-width-1-3@s uk-text-center">
                    <btn icon="done" @click="close()" gradient=""> I'm fine with that </btn>
                    <a class="c-gray uk-display-block uk-margin-small-top" @click="exit()">Decline and leave</a>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            accepted: false
        }
    },
    components: {
        'btn': Button
    },
    methods: {
        close() {
            localStorage.setItem('cookies-accepted', 'true');
            this.accepted = true;
        },
        exit() {
            location.href = 'about:blank';
        }
    },
    beforeMount() {
        this.accepted = localStorage.getItem('cookies-accepted') === 'true';
    }
};

export default component;