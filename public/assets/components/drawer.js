var component = {
    template: `
        <div id="drawer" uk-offcanvas="overlay: false, mode: push">
            <div class="uk-offcanvas-bar">
                <div class="uk-flex uk-flex-middle">
                    <img class="nav-logo uk-margin-right" src="/images/logo.svg">
                    <h1 class="nav-logo-title uk-text-bold c-gradient" style="letter-spacing: 2px">STADIA+</h1>
                </div>
                <hr>
                <p>Testest</p>
                <button class="uk-offcanvas-close" type="button" uk-close></button>
            </div>
        </div>
    `,

    data() {
        return {

        }
    },
    
    mounted() {
    }
};

export default component;