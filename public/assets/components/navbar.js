import Button from '/components/button.js';
import Drawer from '/components/drawer.js';
import SearchBar from '/components/search-bar.js';

var component = {
    template: `
        <div class="navbar">
            <div class="overlay bg-white uk-width-1-1">
                <div class="uk-container uk-container-large" style="height: 100%">
                    <div class="uk-height-1-1" uk-grid>
                        <div class="uk-width-expand">
                            <div @click="goToHome()" class="logo-container uk-flex-inline uk-flex-middle uk-height-1-1">
                                <img class="logo uk-margin-right" src="/images/logo.svg">
                                <h1 class="logo-title uk-text-bold c-gradient" style="letter-spacing: 2px">STADIA+</h1>
                                <h1 v-if="db != undefined" class="logo-db uk-text-bolder uk-margin-small-left c-cherry">DB</h1>
                            </div>
                        </div>
                        <div v-if="search != undefined" class="uk-visible@m uk-flex uk-flex-middle">
                            <search-bar icon="search"></search-bar>
                        </div>
                        <div class="uk-visible@m uk-width-expand uk-flex uk-flex-right uk-flex-middle">
                            <a @click="goToHome()" class="c-dark-gray uk-text-medium uk-margin-medium-right">Home</a>
                            <a @click="goToSearch()" :class="{'c-tomato': db != undefined, 'c-dark-gray': db == undefined, 'uk-text-bold': db != undefined}" class="uk-text-medium uk-margin-medium-right">DB</a>
                            <a @click="openWikiPage()" class="c-dark-gray uk-text-medium uk-margin-medium-right">Help & docs</a>
                            <btn v-if="search == undefined" class="uk-margin-small-left" icon="get_app" @click="openExtensionPage()" gradient=""> Get the free extension </btn>
                        </div>
                        <div class="uk-hidden@m uk-width-expand uk-flex uk-flex-right uk-flex-middle">
                            <a class="menu c-tomato uk-flex uk-flex-middle" uk-toggle="target: #drawer">
                                <i class="material-icons">menu</i>
                            </a>
                        </div>
                    </div>
                </div>

                <drawer id="drawer"></drawer>
            </div>
        </div>
    `,

    props: [ 'db', 'drawer', 'search' ],
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
        },
        goToSearch() {
            location.href = `${location.origin}/search`;
        }
    },
    components: {
        'btn': Button,
        'drawer': Drawer,
        'search-bar': SearchBar
    }
};

export default component;