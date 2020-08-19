import Button from '/components/button.js';

var component = {
    template: `
        <div class="navbar uk-width-1-1">
            <div class="uk-container uk-container-large" style="height: 100%">
                <div class="uk-height-1-1" uk-grid>
                    <div @click="goToHome()" class="nav-logo-container uk-flex uk-flex-middle uk-height-1-1 uk-width-1-2">
                        <img class="nav-logo uk-margin-right" src="/images/logo.svg">
                        <h1 class="nav-logo-title uk-text-bold c-gradient" style="letter-spacing: 2px">STADIA+</h1>
                        <h1 v-if="showdb != undefined" class="nav-logo-db uk-text-bolder uk-margin-small-left c-cherry">DB</h1>
                    </div>
                    <div class="uk-width-1-2 uk-flex uk-flex-right uk-flex-middle">
                        <a @click="goToHome()" class="c-dark-gray uk-text-medium uk-margin-medium-right">Home</a>
                        <a @click="openWikiPage()" class="c-dark-gray uk-text-medium uk-margin-medium-right">Help & docs</a>
                        <btn class="uk-margin-small-left" icon="get_app" @click="openExtensionPage()" gradient=""> Get the free extension </btn>
                    </div>
                </div>
            </div>
        </div>
    `,

    props: [ 'showdb' ],
    methods: {
        openExtensionPage() {
            window.open(
                'https://chrome.google.com/webstore/detail/stadia%20-extension/bbhmnnecicphphjamhdefpagipoegijd',
                '_blank'
            );
        },
        openWikiPage() {
            window.open(
                'https://github.com/Mafrans/StadiaPlus/wiki',
                '_blank'
            );
        },
        goToHome() {
            location.href = location.origin;
        }
    },
    components: {
        'btn': Button
    }
};

export default component;