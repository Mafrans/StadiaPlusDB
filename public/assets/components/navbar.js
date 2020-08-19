var component = {
    template: `
        <div class="navbar uk-width-1-1">
            <div class="uk-container uk-container-large" style="height: 100%">
                <div class="nav-logo-container uk-flex uk-flex-middle uk-height-1-1">
                    <img class="nav-logo uk-margin-right" src="/images/logo.svg">
                    <h1 class="nav-logo-title uk-text-bold c-gradient">STADIA+</h1>
                    <h1 v-if="showDb" class="nav-logo-db uk-text-bolder uk-margin-small-left c-cherry">DB</h1>
                </div>
                <slot></slot>
            </div>
        </div>
    `,

    props: [ 'show-db' ]
};

export default component;